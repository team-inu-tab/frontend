import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const BASE_URL = "https://maeilmail.co.kr/api";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터 - accessToken 자동 추가
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

export const useMailApi = () => {
  // 엑세스 토큰 가져오기/호출
  const getToken = async () => {
    let token = useAuthStore.getState().accessToken;

    if (!token) {
      await refresh();
      token = useAuthStore.getState().accessToken;
    }

    return token;
  };

  // 엑세스 토큰 발급
  const refresh = async () => {
    try {
      const res = await fetch(`${BASE_URL}/oauth2/reissue`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const accessToken = res.headers.get("Authorization");
        if (accessToken) {
          useAuthStore.getState().setAccessToken(accessToken);
          return accessToken;
        }
      }

      throw new Error("토큰 갱신 실패");
    } catch (error) {
      console.error("토큰 갱신 중 오류 발생:", error);
      throw error;
    }
  };

  // 받은 메일함 조회
  const fetchReceiveMails = async () => {
    await getToken();
    const res = await api.get("/mails/receive");
    return res.data;
  };

  // 보낸 메일함 조회
  const fetchSentMails = async () => {
    await getToken();
    const res = await api.get("/mails/send");
    return res.data;
  };

  // 임시 보관 메일함 조회
  const fetchDraftMails = async () => {
    await getToken();
    const res = await api.get("/mails/draft");
    return res.data;
  };

  // 중요 메일함 조회
  const fetchImportantMails = async () => {
    await getToken();
    const res = await api.get("/mails/important");
    return res.data;
  };

  // 내게 쓴 메일함 조회
  const fetchSelfSentMails = async () => {
    await getToken();
    const res = await api.get("/mails/self");
    return res.data;
  };

  // 스팸 메일함 조회
  const fetchSpamMails = async () => {
    await getToken();
    const res = await api.get("/mails/spam");
    return res.data;
  };

  // 휴지통 메일함 조회
  const fetchDeletedMails = async () => {
    await getToken();
    const res = await api.get("/mails/trash");
    return res.data;
  };

  const getMimeType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    const mimeTypes = {
      pdf: "application/pdf",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      zip: "application/zip",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      txt: "text/plain",
      html: "text/html",
      htm: "text/html",
    };
    return mimeTypes[extension] || "application/octet-stream";
  };

  const isValidBase64 = (str) => {
    if (typeof str !== "string" || !str) return false;

    // base64 문자열 패턴 검사
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    const sanitized = str.replace(/[\r\n\s]+/g, "");

    return base64Regex.test(sanitized);
  };

  const base64ToBlob = (base64String, mimeType) => {
    try {
      // 개행 제거
      const sanitized = base64String.replace(/[\r\n\s]+/g, "");

      // base64 디코딩
      const byteCharacters = atob(sanitized);
      const byteArrays = [];

      // 청크 단위로 처리하여 메모리 효율성 개선
      const sliceSize = 1024 * 1024; // 1MB 청크
      const len = byteCharacters.length;

      for (let offset = 0; offset < len; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: mimeType });
    } catch (error) {
      console.error("Base64 변환 실패:", error);
      throw new Error("파일 변환에 실패했습니다");
    }
  };

  const handleFileError = (error, operation) => {
    console.error(`파일 ${operation} 오류:`, error);
    alert(`파일 ${operation}에 실패했습니다. 다시 시도해주세요.`);
    throw error;
  };

  // 파일 상세 보기 - 첨부파일 다운로드
  const getFile = async ({ emailId, attachmentId, fileName }) => {
    await getToken();
    try {
      const res = await api.get(`/mails/${emailId}/file/${attachmentId}`, {
        responseType: "text",
      });

      const base64Data = res.data?.trim();

      if (!isValidBase64(base64Data)) {
        console.error("잘못된 base64 데이터:", base64Data);
        throw new Error("잘못된 파일 데이터입니다");
      }

      const mimeType = getMimeType(fileName);
      const blob = base64ToBlob(base64Data, mimeType);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;

      // 다운로드 요소를 DOM에 추가하고 즉시 클릭
      document.body.appendChild(a);
      a.click();

      // 클린업
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      handleFileError(error, "다운로드");
    }
  };

  // 파일 상세 보기 - 미리보기용 URL 생성
  const getFilePreviewUrl = async ({ emailId, attachmentId, fileName }) => {
    await getToken();
    try {
      const res = await api.get(`/mails/${emailId}/file/${attachmentId}`, {
        responseType: "text",
      });

      const base64Data = res.data?.trim();

      if (!isValidBase64(base64Data)) {
        console.error("잘못된 base64 데이터:", base64Data);
        throw new Error("잘못된 파일 데이터입니다");
      }

      const mimeType = getMimeType(fileName);

      // 미리보기 지원 형식 체크
      const supportedPreviewTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
        "text/plain",
        "text/html",
      ];

      if (!supportedPreviewTypes.includes(mimeType)) {
        throw new Error("미리보기를 지원하지 않는 파일 형식입니다");
      }

      const blob = base64ToBlob(base64Data, mimeType);
      const objectUrl = URL.createObjectURL(blob);

      // 메모리 누수 방지를 위한 URL 해제 타이머 설정
      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 5 * 60 * 1000); // 5분 후 해제

      return objectUrl;
    } catch (error) {
      handleFileError(error, "미리보기");
      return null;
    }
  };

  // 스팸 차단
  const markAsSpam = async (mailId) => {
    await getToken();
    const res = await api.post(`/mails/spam/${mailId}`);
    return res.data;
  };

  // 스팸 해제
  const unmarkAsSpam = async (mailId) => {
    await getToken();
    const res = await api.delete(`/mails/spam/${mailId}`);
    return res.data;
  };

  // 메일 임시 삭제
  const deleteTemporaryMails = async (selectedMailIds) => {
    await getToken();
    const res = await api.delete("/mails/trash/temporary", {
      data: {
        selectedMailIds,
      },
    });
    return res.data;
  };

  // 메일 영구 삭제
  const deletePermanentMails = async (selectedMailIds) => {
    await getToken();
    const res = await api.delete("/mails/trash/permanent", {
      data: {
        selectedMailIds,
      },
    });
    return res.data;
  };

  // 특정 사용자와 주고받은 메일 조회
  const searchMailsByUserEmail = async (userEmail, pageToken = "") => {
    await getToken();
    const res = await api.post(
      `/mails/search/userEmail?pageToken=${pageToken}`,
      {
        userEmail,
      }
    );
    return res.data;
  };

  // 임시 메일 수정
  const updateDraftMail = async ({ draftId, toEmail, subject, body }) => {
    await getToken();
    const res = await api.patch("/mails/draft", {
      draftId,
      toEmail,
      subject,
      body,
    });
    return res.data;
  };

  // 지정된 메일 조회
  const getMailById = async (mailId) => {
    await getToken();
    const res = await api.get(`/mails/send/${mailId}`);
    return res.data;
  };

  return {
    getToken,
    refresh,
    fetchReceiveMails,
    fetchSentMails,
    fetchDraftMails,
    fetchImportantMails,
    fetchSelfSentMails,
    fetchSpamMails,
    fetchDeletedMails,
    markAsSpam,
    unmarkAsSpam,
    getFile,
    getFilePreviewUrl,
    deleteTemporaryMails,
    deletePermanentMails,
    searchMailsByUserEmail,
    updateDraftMail,
    getMailById,
  };
};

export { api };
