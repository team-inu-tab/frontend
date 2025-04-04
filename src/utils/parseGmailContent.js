import { api } from "@/hooks/useMailApi";

/**
 * Gmail API로 받은 메일 content 구조를 HTML 문자열로 변환
 * 이미지가 본문에 포함된 경우 data:image 로 치환
 * 첨부파일은 별도 추출
 *
 * @param {Object} content - Gmail MIME 구조의 content
 * @param {string} messageId - 메일 메시지 ID (이미지 요청 시 필요)
 * @returns {Promise<{ html: string, attachments: Array }>}
 */
export const parseGmailContent = async (content, messageId) => {
  if (!content) return { html: "", attachments: [] };

  const parts = flattenParts(content);
  const htmlPart = parts.find((p) => p.mimeType === "text/html");
  const plainPart = parts.find((p) => p.mimeType === "text/plain");
  let html = decodePartData(
    htmlPart?.body?.data || plainPart?.body?.data || ""
  );

  const cidMap = {};
  const attachments = [];

  parts.forEach((part) => {
    const cidHeader = part.headers?.find(
      (h) => h.name.toLowerCase() === "content-id"
    );
    const dispHeader = part.headers?.find(
      (h) => h.name.toLowerCase() === "content-disposition"
    );

    const filename = part.filename;

    // 본문 inline 이미지 처리
    if (cidHeader && dispHeader?.value?.includes("inline")) {
      const cid = cidHeader.value.replace(/[<>]/g, "");
      cidMap[cid] = part.body.attachmentId;
    }

    // 첨부파일로 분류
    if (filename && dispHeader?.value?.toLowerCase().includes("attachment")) {
      attachments.push({
        fileName: filename,
        attachmentId: part.body.attachmentId,
      });
    }
  });

  // cid → data:image 치환
  for (const [cid, attachmentId] of Object.entries(cidMap)) {
    try {
      const base64 = await fetchInlineImage(messageId, attachmentId);
      const imageSrc = `data:image/png;base64,${base64}`;
      html = html.replace(new RegExp(`cid:${cid}`, "g"), imageSrc);
    } catch (e) {
      console.warn(`cid 이미지 치환 실패: ${cid}`, e);
    }
  }

  return { html, attachments };
};

// 평탄화
const flattenParts = (content) => {
  const result = [];

  const recurse = (part) => {
    if (part.parts) {
      part.parts.forEach(recurse);
    } else {
      result.push(part);
    }
  };

  recurse(content);
  return result;
};

// base64 디코딩
const decodePartData = (data) => {
  try {
    if (!data) return "";

    const fixed = data.replace(/-/g, "+").replace(/_/g, "/");
    const byteString = atob(fixed);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    return new TextDecoder("utf-8").decode(byteArray);
  } catch (e) {
    console.error("base64 디코딩 실패:", e);
    return "";
  }
};

// Gmail API에서 inline 이미지 fetch
const fetchInlineImage = async (messageId, attachmentId) => {
  const res = await api.get(
    `/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`
  );
  return res.data.data;
};
