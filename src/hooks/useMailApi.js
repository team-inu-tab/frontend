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
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한루프 방지용
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
            return api(originalRequest); // 요청 재시도
          }
        }
        useAuthStore.getState().clearAccessToken();
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      } catch {
        useAuthStore.getState().clearAccessToken();
        alert("세션 복구 실패");
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
    } catch {
      alert("받은 메일 조회 실패");
    }
  };

  // 보낸 메일함 조회
  const fetchSentMails = async () => {
    try {
      const res = await api.get("/mails/send");
      return res.data;
    } catch {
      alert("보낸 메일 조회 실패");
    }
  };

  // 임시 메일함 조회
  const fetchDraftMails = async () => {
    try {
      const res = await api.get("/mails/draft");
      return res.data;
    } catch {
      alert("임시 메일 조회 실패");
    }
  };

  // 중요 메일함 조회
  const fetchImportantMails = async () => {
    try {
      const res = await api.get("/mails/important");
      return res.data;
    } catch {
      alert("중요 메일 조회 실패");
    }
  };

  // 내게 쓴 메일함 조회
  const fetchSelfSentMails = async () => {
    try {
      const res = await api.get("/mails/self");
      return res.data;
    } catch {
      alert("내게 쓴 메일 조회 실패");
    }
  };

  // 첨부파일 상세보기
  const getFile = async ({ emailId, attachmentId }) => {
    try {
      const res = await api.get(`/mails/${emailId}/file/${attachmentId}`, {
        responseType: "blob",
      });
      const blob = res.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = attachmentId;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("파일 다운로드 실패");
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
