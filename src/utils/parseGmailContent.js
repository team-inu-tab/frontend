import { api } from "@/hooks/useMailApi";

/**
 * Gmail API로 받은 메일 content 구조를 HTML 문자열로 변환
 * 이미지가 본문에 포함된 경우 data:image 로 치환
 *
 * @param {Object} content - Gmail MIME 구조의 content
 * @param {string} messageId - 메일 메시지 ID (이미지 요청 시 필요)
 * @returns {Promise<string>} 디코딩된 HTML 문자열
 */
export const parseGmailContent = async (content, messageId) => {
  if (!content) return "";

  // HTML 또는 TEXT 본문 파트 찾기
  const parts = flattenParts(content);
  const htmlPart = parts.find((p) => p.mimeType === "text/html");
  const plainPart = parts.find((p) => p.mimeType === "text/plain");
  let html = decodePartData(
    htmlPart?.body?.data || plainPart?.body?.data || ""
  );

  // Content-ID → attachmentId 매핑 (본문 이미지용)
  const cidMap = {};
  parts.forEach((part) => {
    const cidHeader = part.headers?.find(
      (h) => h.name.toLowerCase() === "content-id"
    );
    const dispHeader = part.headers?.find(
      (h) => h.name.toLowerCase() === "content-disposition"
    );

    if (cidHeader && dispHeader?.value?.includes("inline")) {
      const cid = cidHeader.value.replace(/[<>]/g, ""); // <cid> → cid
      cidMap[cid] = part.body.attachmentId;
    }
  });

  // cid → data:image 로 치환
  for (const [cid, attachmentId] of Object.entries(cidMap)) {
    try {
      const imageBase64 = await fetchInlineImage(messageId, attachmentId);
      const imageSrc = `data:image/png;base64,${imageBase64}`;
      html = html.replace(new RegExp(`cid:${cid}`, "g"), imageSrc);
    } catch (err) {
      console.warn(`이미지 ${cid} 로드 실패`, err);
    }
  }

  return html;
};

// Gmail 파트 구조를 평탄화
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

// base64 디코딩 (Gmail은 base64url 사용)
const decodePartData = (data) => {
  try {
    if (!data) return "";
    const fixed = data.replace(/-/g, "+").replace(/_/g, "/");
    return atob(fixed);
  } catch (e) {
    console.error("base64 decode 실패:", e);
    return "";
  }
};

// 이미지 요청 (Gmail API에서 inline 이미지 받기)
const fetchInlineImage = async (messageId, attachmentId) => {
  const res = await api.get(
    `/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`
  );
  return res.data.data; // base64 string
};
