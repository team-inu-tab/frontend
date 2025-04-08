import { create } from "zustand";

export const useWriteStore = create((set) => ({
  isWriteModalOpen: false, // 메일 작성 모달 열림 여부

  //  메일 작성 모달 열림/닫힘 액션
  toggleWriteModal: () =>
    set((state) => ({
      isWriteModalOpen: !state.isWriteModalOpen,
    })),

  setWriteModalOpen: (value) =>
    set(() => ({
      isWriteModalOpen: value,
    })),
}));
