import axios from "axios";
import useAuthStore from "../store/useAuthStore";
// import toast from "react-hot-toast";

const BASE_URL = "https://maeilmail.co.kr/api";

let isRefreshing = false;
let refreshPromise = null;

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

// // 인증 실패 시 처리
// const handleAuthFailure = () => {
//   toast.error("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
//   window.location.href = "/login";
// };

export const useMailApi = () => {
  // 엑세스 토큰 가져오기/호출
  const getToken = async () => {
    let token = useAuthStore.getState().accessToken;

    if (!token) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refresh().finally(() => {
          isRefreshing = false;
        });
      }

      try {
        await refreshPromise;
        token = useAuthStore.getState().accessToken;

        if (!token) {
          throw new Error("토큰 획득 실패");
        }
      } catch (err) {
        console.error("getToken 실패:", err);
        throw err;
      }
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
          console.log("accessToken 갱신 완료");
          return accessToken;
        } else {
          console.warn("Authorization 토큰 없음");
        }
      } else {
        const errorMsg = await res.text();
        console.error("리프레시 실패 응답:", errorMsg);
      }

      // handleAuthFailure();
      throw new Error("토큰 갱신 실패");
    } catch (error) {
      console.error("refresh 중 예외:", error);
      // handleAuthFailure();
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

  // Blob 다운로드 유틸
  const downloadBase64File = (
    base64Data,
    fileName,
    mimeType = "application/octet-stream"
  ) => {
    try {
      // 1. data:URL 형식이면 prefix 제거
      if (base64Data.startsWith("data:")) {
        base64Data = base64Data.split(",")[1];
      }

      // 2. base64 → 바이너리 디코딩
      const byteCharacters = atob(base64Data);
      const byteNumbers = Array.from(byteCharacters, (char) =>
        char.charCodeAt(0)
      );
      const byteArray = new Uint8Array(byteNumbers);

      // 3. Blob 생성 (파일 유형 지정)
      const blob = new Blob([byteArray], { type: mimeType });

      // 4. 다운로드 트리거
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // 5. 정리
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
      alert("파일을 다운로드할 수 없습니다.");
    }
  };

  // 파일 상세 보기 - 첨부파일 다운로드
  const getFile = async ({ emailId, attachmentId, fileName }) => {
    await getToken();
    const res = await api.get(`/mails/${emailId}/file/${attachmentId}`);

    // 필요 시 MIME 타입을 확장자 기반으로 지정 가능
    const mimeType = fileName.endsWith(".pdf")
      ? "application/pdf"
      : "application/octet-stream";

    downloadBase64File(res.data, fileName, mimeType);
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

  // chatGPT AI
  const getChatGpt = async (message) => {
    await getToken();
    const res = await api.post("/api/gpt", {
      message,
    });
    return res.data;
  };

  // 임시 저장
  const updateTemporary = async ({ toEmail, subject, body }) => {
    await getToken();
    const res = await api.post("/mails/draft", {
      toEmail,
      subject,
      body,
    });
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
    deleteTemporaryMails,
    deletePermanentMails,
    searchMailsByUserEmail,
    updateDraftMail,
    getMailById,
    getChatGpt,
    updateTemporary,
  };
};

export { api };
