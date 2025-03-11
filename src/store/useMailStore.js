import { create } from "zustand";

export const useMailStore = create((set) => ({
  selectedMail: null, // 선택된 개별 메일 - mailDetail을 보여주기 위함
  selectedGroup: [], // 선택된 메일 그룹(받은사람 묶어보기 정렬) - mailPreview를 위함

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
