import axios from "axios";

const BASE_URL = "https://maeilmail.co.kr/api";

export const useMailApi = () => {
  const getToken = () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("액세스 토큰이 없습니다.");
    return token;
  };

  // 받은 메일함 조회
  const fetchReceiveMails = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${BASE_URL}/mails/receive`, {
        headers: { Authorization: token },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        alert(`실패: ${error.response.status}`);
      } else {
        alert("받은 메일 수신 중 오류 발생");
      }
      console.error(error);
    }
  };

  // 보낸 메일함 조회
  const fetchSentMails = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${BASE_URL}/mails/send`, {
        headers: { Authorization: token },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        alert(`실패: ${error.response.status}`);
      } else {
        alert("보낸 메일 수신 중 오류 발생");
      }
      console.error(error);
    }
  };

  // 임시 메일함 조회
  const fetchDraftMails = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${BASE_URL}/mails/draft`, {
        headers: { Authorization: token },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        alert(`실패: ${error.response.status}`);
      } else {
        alert("임시 메일 수신 중 오류 발생");
      }
      console.error(error);
    }
  };

  // 예약 메일함 조회
  const fetchScheduledMails = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${BASE_URL}/mails/schedule`, {
        headers: { Authorization: token },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        alert(`실패: ${error.response.status}`);
      } else {
        alert("예약 메일 수신 중 오류 발생");
      }
      console.error(error);
    }
  };

  // 중요 메일함 조회
  const fetchImportantMails = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${BASE_URL}/mails/important`, {
        headers: { Authorization: token },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        alert(`실패: ${error.response.status}`);
      } else {
        alert("중요 메일 수신 중 오류 발생");
      }
      console.error(error);
    }
  };

  // 내게 쓴 메일함 조회
  const fetchSelfSentMails = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${BASE_URL}/mails/self`, {
        headers: { Authorization: token },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        alert(`실패: ${error.response.status}`);
      } else {
        alert("내게 쓴 메일 수신 중 오류 발생");
      }
      console.error(error);
    }
  };

  return {
    fetchReceiveMails,
    fetchSentMails,
    fetchDraftMails,
    fetchScheduledMails,
    fetchImportantMails,
    fetchSelfSentMails,
  };
};
