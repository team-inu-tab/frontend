import { create } from "zustand";

export const useCheckboxStore = create((set, get) => ({
  // 메일함별로 선택된 메일 ID들을 저장
  checkedByBox: {
    receive: new Set(),
    important: new Set(),
    deleted: new Set(),
    draft: new Set(),
    scheduled: new Set(),
    selfsent: new Set(),
    sent: new Set(),
    spam: new Set(),
  },

  // 개별 메일 체크박스 토글
  toggleCheck: (box, id) => {
    const currentState = get().checkedByBox[box] || new Set();
    const updated = new Set(currentState);

    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }

    set((state) => ({
      checkedByBox: { ...state.checkedByBox, [box]: updated },
    }));
  },

  // 전체 선택
  checkAll: (box, ids) => {
    set((state) => ({
      checkedByBox: { ...state.checkedByBox, [box]: new Set(ids) },
    }));
  },

  // 전체 선택 해제
  uncheckAll: (box) => {
    set((state) => ({
      checkedByBox: { ...state.checkedByBox, [box]: new Set() },
    }));
  },

  // 특정 메일 ID가 선택되었는지 여부 반환
  isChecked: (box, id) => {
    const isChecked = get().checkedByBox[box]?.has(id) ?? false;
    return isChecked;
  },

  // 모든 메일이 선택된 상태인지 확인
  isAllChecked: (box, ids) => {
    const allChecked =
      ids.length > 0 && ids.every((id) => get().checkedByBox[box]?.has(id));
    return allChecked;
  },

  // 일부만 선택된 상태인지 확인
  isIndeterminate: (box, ids) => {
    const checked = get().checkedByBox[box] ?? new Set();
    const indeterminate =
      ids.some((id) => checked.has(id)) && !ids.every((id) => checked.has(id));
    return indeterminate;
  },

  // 선택된 메일 ID 목록 반환
  getCheckedIds: (box) => {
    const ids = Array.from(get().checkedByBox[box] ?? []);
    return ids;
  },
}));
