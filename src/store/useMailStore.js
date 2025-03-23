import { create } from "zustand";

export const useMailStore = create((set) => ({
  // 메일 리스트
  receiveMails: [],
  sentMails: [],
  deletedMails: [],
  draftMails: [],
  importantMails: [],
  scheduledMails: [],
  selfSentMails: [],
  spamMails: [],

  // 상태 및 에러
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,

  // 선택된 메일
  selectedMail: null, // 선택된 개별 메일 - mailDetail을 보여주기 위함
  selectedGroup: [], // 선택된 메일 그룹(받은사람 묶어보기 정렬) - mailPreview를 위함

  isExpanded: false, // mailDetailMax 확장 여부

  // 메일 리스트 설정 함수
  setReceivedMails: (mails) => set({ receiveMails: mails }),
  setSentMails: (mails) => set({ sentMails: mails }),
  setDeletedMails: (mails) => set({ deletedMails: mails }),
  setDraftMails: (mails) => set({ draftMails: mails }),
  setImportantMails: (mails) => set({ importantMails: mails }),
  setScheduledMails: (mails) => set({ scheduledMails: mails }),
  setSelfSentMails: (mails) => set({ selfSentMails: mails }),
  setSpamMails: (mails) => set({ spamMails: mails }),

  // 상태 처리
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),

  // 선택된 메일 설정 함수
  setSelectedMail: (mail) => set({ selectedMail: { ...mail } }),
  setSelectedGroup: (mails) =>
    set(() => {
      const updatedMails = mails.map((mail) => ({ ...mail }));
      return {
        selectedGroup: updatedMails,
      };
    }),

  // mailDetailMax 확장 여부 토글
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  // 선택된 메일, 확장 여부 초기화
  reset: () => set({ selectedMail: null, isExpanded: false }),
}));
