import { create } from "zustand";

export const useMailStore = create((set) => ({
  selectedMail: {}, // 선택된 개별 메일 - mailDetail을 보여주기 위함
  selectedGroup: [], // 선택된 메일 그룹(받은사람 묶어보기 정렬) - mailPreview를 위함

  setSelectedMail: (mail) => set({ selectedMail: { ...mail } }),

  setSelectedGroup: (mails) =>
    set({ selectedGroup: mails.map((mail) => ({ ...mail })) }),
}));
