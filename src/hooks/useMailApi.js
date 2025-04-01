import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const BASE_URL = "https://maeilmail.co.kr/api";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// api 요청 시 accessToken 자동 포함
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

// 401 응답 시 refresh 시도 후 api 재요청
api.interceptors.response.use(
  (response) => response, // 응답이 성공한 경우 그대로 반환
  async (error) => {
    const originalRequest = error.config; // 원래 요청 정보를 저장

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await fetch(`${BASE_URL}/oauth2/reissue`, {
          method: "POST",
          credentials: "include",
        });

        if (res.status === 200) {
          const newToken = res.headers.get("Authorization");

          if (newToken) {
            useAuthStore.getState().setAccessToken(newToken);
            originalRequest.headers["Authorization"] = newToken;
            return api(originalRequest); // 재요청
          }
        }
      } catch (err) {
        useAuthStore.getState().clearAccessToken();
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const useMailApi = () => {
  // 엑세스 토큰 가져오기
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
    const res = await fetch(`${BASE_URL}/oauth2/reissue`, {
      method: "POST",
      credentials: "include",
    });

    if (res.status === 200) {
      const accessToken = res.headers.get("Authorization");
      if (accessToken) {
        useAuthStore.getState().setAccessToken(accessToken);
        return accessToken;
      }
    } else {
      throw new Error("토큰 저장 실패");
    }
  };

  // 받은 메일함 조회
  const fetchReceiveMails = async () => {
    try {
      const res = await api.get("/mails/receive");
      return res.data;
    } catch (error) {
      alert("받은 메일 조회 실패");
      throw error;
    }
  };

  // 보낸 메일함 조회
  const fetchSentMails = async () => {
    try {
      const res = await api.get("/mails/send");
      return res.data;
    } catch (error) {
      alert("보낸 메일 조회 실패");
      throw error;
    }
  };

  // 임시 메일함 조회
  const fetchDraftMails = async () => {
    try {
      const res = await api.get("/mails/draft");
      return res.data;
    } catch (error) {
      alert("임시 메일 조회 실패");
      throw error;
    }
  };

  // 중요 메일함 조회
  const fetchImportantMails = async () => {
    try {
      const res = await api.get("/mails/important");
      return res.data;
    } catch (error) {
      alert("중요 메일 조회 실패");
      throw error;
    }
  };

  // 내게 쓴 메일함 조회
  const fetchSelfSentMails = async () => {
    try {
      const res = await api.get("/mails/self");
      return res.data;
    } catch (error) {
      alert("내게 쓴 메일 조회 실패");
      throw error;
    }
  };

  // 첨부파일 상세보기
  const getFile = async ({ emailId, attachmentId, fileName }) => {
    try {
      // base64 문자열 받기 (텍스트 응답)
      const res = await api.get(`/mails/${emailId}/file/${attachmentId}`, {
        responseType: "text", // 또는 기본값 (json 아님)
      });

      const base64 = res.data;

      // 확장자 추출
      const extension = fileName.split(".").pop().toLowerCase();

      // MIME 타입 매핑 (필요한 포맷만 추가)
      const mimeTypes = {
        pdf: "application/pdf",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        zip: "application/zip",
        jpg: "image/jpeg",
        png: "image/png",
      };

      const mimeType = mimeTypes[extension] || "application/octet-stream"; // 기본값

      // base64 → Uint8Array 변환
      const byteCharacters = atob(base64.trim());
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      // 다운로드 트리거
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("파일 다운로드 실패");
      console.error(error);
      throw error;
    }
  };

  return {
    getToken,
    refresh,
    fetchReceiveMails,
    fetchSentMails,
    fetchDraftMails,
    fetchImportantMails,
    fetchSelfSentMails,
    getFile,
  };
};
