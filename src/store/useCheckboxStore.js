import { create } from "zustand";
import { useSortStore, SORT_OPTIONS } from "./useSortStore";

export const useCheckboxStore = create((set) => ({
  // mails: [],
  selectedCount: 0,

  // // 전체 메일 업데이트
  // setMails: (mails) =>
  //   set(() => {
  //     const updatedMails = mails.map((mail) => ({
  //       ...mail,
  //       isChecked: mail.isChecked ?? false,
  //     }));
  //     return {
  //       mails: updatedMails,
  //       selectedCount: updatedMails.filter((mail) => mail.isChecked).length,
  //     };
  //   }),

  // 메일 전체 선택
  selectAll: (isChecked) =>
    set((state) => {
      const sortOption = useSortStore.getState().sortOption;

      if (sortOption === SORT_OPTIONS.TIME) {
        const updatedMails = state.mails.map((mail) => ({
          ...mail,
          isChecked,
        }));
        return {
          mails: updatedMails,
          selectedCount: isChecked ? updatedMails.length : 0,
        };
      } else {
        const updatedGroupedMails = state.mails.map((group) => ({
          ...group,
          mailItems: group.mailItems.map((mail) => ({ ...mail, isChecked })),
        }));
        return {
          mails: updatedGroupedMails,
          selectedCount: isChecked
            ? updatedGroupedMails.flatMap((group) => group.mailItems).length
            : 0,
        };
      }
    }),

  // 개별 선택
  toggleCheckbox: (id, isChecked) =>
    set((state) => {
      const sortOption = useSortStore.getState().sortOption;

      if (sortOption === SORT_OPTIONS.TIME) {
        const updatedMails = state.mails.map((mail) =>
          mail.id === id ? { ...mail, isChecked } : mail
        );
        return {
          mails: updatedMails,
          selectedCount: updatedMails.filter((mail) => mail.isChecked).length,
        };
      } else {
        const updatedGroupedMails = state.mails.map((group) => ({
          ...group,
          mailItems: group.mailItems.map((mail) =>
            mail.id === id ? { ...mail, isChecked } : mail
          ),
        }));
        return {
          mails: updatedGroupedMails,
          selectedCount: updatedGroupedMails
            .flatMap((group) => group.mailItems)
            .filter((mail) => mail.isChecked).length,
        };
      }
    }),
}));
