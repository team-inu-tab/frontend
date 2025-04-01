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

// 중복 refresh 방지용 플래그 & 대기열
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

// 응답 인터셉터 - 401 에러 시 토큰 재발급 및 재요청
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await fetch(`${BASE_URL}/oauth2/reissue`, {
            method: "POST",
            credentials: "include",
          });

          if (res.status === 200) {
            const newToken = res.headers.get("Authorization");
            if (newToken) {
              useAuthStore.getState().setAccessToken(newToken);
              onRefreshed(newToken);
              isRefreshing = false;
            }
          } else {
            throw new Error("리프레시 실패");
          }
        } catch (err) {
          isRefreshing = false;
          useAuthStore.getState().clearAccessToken();
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          originalRequest.headers["Authorization"] = newToken;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

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
    }

    throw new Error("토큰 저장 실패");
  };

  // 받은 메일함 조회
  const fetchReceiveMails = async () => {
    await getToken();
    const res = await api.get("/mails/receive");
    return res.data;
  };

  const fetchSentMails = async () => {
    await getToken();
    const res = await api.get("/mails/send");
    return res.data;
  };

  const fetchDraftMails = async () => {
    await getToken();
    const res = await api.get("/mails/draft");
    return res.data;
  };

  const fetchImportantMails = async () => {
    await getToken();
    const res = await api.get("/mails/important");
    return res.data;
  };

  const fetchSelfSentMails = async () => {
    await getToken();
    const res = await api.get("/mails/self");
    return res.data;
  };

  // 첨부파일 다운로드 (base64 디코딩)
  const getFile = async ({ emailId, attachmentId, fileName }) => {
    await getToken();
    try {
      const res = await api.get(`/mails/${emailId}/file/${attachmentId}`, {
        responseType: "text",
      });

      const base64 = res.data;
      const extension = fileName.split(".").pop().toLowerCase();

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

      const mimeType = mimeTypes[extension] || "application/octet-stream";

      const byteCharacters = atob(base64.trim());
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

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
