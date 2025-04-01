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
    const updated = new Set(get().checkedByBox[box]);
    updated.has(id) ? updated.delete(id) : updated.add(id); // 이미 선택된 상태면 제거
    set((state) => ({
      checkedByBox: { ...state.checkedByBox, [box]: updated },
    }));
  },

  // 전체 선택
  checkAll: (box, ids) =>
    set((state) => ({
      checkedByBox: { ...state.checkedByBox, [box]: new Set(ids) },
    })),

  // 전체 선택 해제
  uncheckAll: (box) =>
    set((state) => ({
      checkedByBox: { ...state.checkedByBox, [box]: new Set() },
    })),

  // 특정 메일 ID가 선택되었는지 여부 반환
  isChecked: (box, id) => get().checkedByBox[box]?.has(id) ?? false,

  // 모든 메일이 선택된 상태인지 확인 (헤더 체크박스에 사용)
  isAllChecked: (box, ids) =>
    ids.length > 0 && ids.every((id) => get().checkedByBox[box]?.has(id)),

  // 일부만 선택된 상태인지 확인 (헤더 체크박스에 사용)
  isIndeterminate: (box, ids) => {
    const checked = get().checkedByBox[box] ?? new Set();
    return (
      ids.some((id) => checked.has(id)) && !ids.every((id) => checked.has(id))
    );
  },

  // 선택된 메일 ID 목록 반환 (선택한 항목에 대한 후처리에 사용 가능)
  getCheckedIds: (box) => Array.from(get().checkedByBox[box] ?? []),
}));
