import { create } from "zustand";
import axios from "axios";

const BASE_URL = "https://likelionfesival.shop";

export const useMailStore = create((set) => ({
  receivedMails: [], // 받은 메일
  sentMails: [], // 보낸 메일
  status: "idle",
  error: null,

  selectedMail: null, // 선택된 개별 메일 - mailDetail을 보여주기 위함
  selectedGroup: [], // 선택된 메일 그룹(받은사람 묶어보기 정렬) - mailPreview를 위함

  // 받은 메일함 불러오기
  fetchReceivedMails: async () => {
    set({ status: "loading" });
    try {
      const token = localStorage.getItem("accessToken"); // 저장된 액세스 토큰 가져오기
      if (!token) throw new Error("인증 토큰이 없습니다.");

      const response = await axios.get(`${BASE_URL}/mails/receive`, {
        headers: { Authorization: `Bearer ${token}` }, // 액세스 토큰 포함
        withCredentials: true, // 쿠키 기반 인증 추가
      });

      set({ receivedMails: response.data, status: "succeeded", error: null });
    } catch (error) {
      set({ status: "failed", error: error.response?.data || error.message });
    }
  },

  // 보낸 메일함 불러오기
  fetchSentMails: async () => {
    set({ status: "loading" });
    try {
      const token = localStorage.getItem("accessToken"); // 저장된 액세스 토큰 가져오기
      if (!token) throw new Error("인증 토큰이 없습니다.");

      const response = await axios.get(`${BASE_URL}/mails/sent`, {
        headers: { Authorization: `Bearer ${token}` }, // 액세스 토큰 포함
        withCredentials: true, // 쿠키 기반 인증 추가
      });

      set({ sentMails: response.data, status: "succeeded", error: null });
    } catch (error) {
      set({ status: "failed", error: error.response?.data || error.message });
    }
  },

  setSelectedMail: (mail) => set({ selectedMail: { ...mail } }),

  setSelectedGroup: (mails) =>
    set(() => {
      const updatedMails = mails.map((mail) => ({ ...mail }));
      return {
        selectedGroup: updatedMails,
      };
    }),

  isExpanded: false, // mailDetailMax 확장 여부
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })), // 확장 여부 토글
  reset: () => set({ selectedMail: null, isExpanded: false }), // 선택된 메일, 확장 여부 초기화
}));
