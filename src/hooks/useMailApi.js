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
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        throw new Error(`토큰 갱신 실패: ${res.status}`);
      }

      const data = await res.json();
      
      // 백엔드 응답 형식에 맞게 토큰 추출
      const accessToken = data.accessToken || data.token || res.headers.get("Authorization");

      if (!accessToken) {
        throw new Error("토큰이 응답에 없습니다.");
      }

      // 토큰 저장
      useAuthStore.getState().setAccessToken(accessToken);
      
      // axios 인스턴스의 기본 헤더 업데이트
      api.defaults.headers.common['Authorization'] = accessToken;
      
      return accessToken;
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

  // 파일 상세 보기 - 첨부파일 다운로드
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

  // 파일 상세 보기 - 미리보기용 URL 생성
  const getFilePreviewUrl = async ({ emailId, attachmentId, fileName }) => {
    await getToken();

    try {
      const res = await api.get(`/mails/${emailId}/file/${attachmentId}`, {
        responseType: "text",
      });

      const base64 = res.data.trim();

      // base64 디코딩 → Uint8Array 생성
      const byteCharacters = atob(base64);
      const byteNumbers = Array.from(byteCharacters).map((c) =>
        c.charCodeAt(0)
      );
      const byteArray = new Uint8Array(byteNumbers);

      // MIME 타입 설정
      const extension = fileName.split(".").pop().toLowerCase();
      const mimeTypes = {
        pdf: "application/pdf",
        jpg: "image/jpeg",
        png: "image/png",
        // 기타 확장자는 뷰어 연동 필요
      };
      const mimeType = mimeTypes[extension] || "application/octet-stream";

      // Blob → URL 생성
      const blob = new Blob([byteArray], { type: mimeType });
      const objectUrl = URL.createObjectURL(blob);

      return objectUrl; // iframe/img의 src로 사용
    } catch (error) {
      console.error("파일 미리보기 생성 실패", error);
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
  // 임시 메일 삭제
  const deleteDraftMail = async (draftId) => {
    await getToken();
    const res = await api.delete("/mails/draft", {
      data: {
        draftId,
      },
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
    getFilePreviewUrl,
    deleteTemporaryMails,
    deletePermanentMails,
    searchMailsByUserEmail,
    updateDraftMail,
    deleteDraftMail,
  };
};

export { api };
