import "@components/mailBox/css/mailListHeader.css";
import { useState } from "react";
import { useCheckboxStore, useSortStore, SORT_OPTIONS } from "../../store";

/**
 * MailListHeader - 메일함 목록 상단의 헤더 컴포넌트
 * @returns {JSX.Element} 메일함 헤더
 */
const MailListHeader = () => {
  const selectedCount = useCheckboxStore((state) => state.selectedCount);
  const selectAll = useCheckboxStore((state) => state.selectAll);
  const changeSortOption = useSortStore((state) => state.changeSortOption);

  const [isSortOptionOpen, setIsSortOptionOpen] = useState(false);

  /**
   * 정렬 옵션 열림/닫힘 상태를 토글하는 함수
   */
  const toggleOption = () => setIsSortOptionOpen((prev) => !prev);

  const handleSortOptionClick = (option) => {
    changeSortOption(option);
    toggleOption();
  };

  return (
    <div className="mailListHeader-wrapper">
      {/* 메일 선택 및 액션 버튼 */}
      <div className="mailListHeader-mailActions">
        {/* 전체 선택 체크박스 */}
        <label>
          <input
            type="checkbox"
            onChange={(e) => selectAll(e.target.checked)}
          />
          <p>전체선택</p>
        </label>

        {/* 선택된 메일이 있을 경우 "읽음", "삭제" 버튼 표시 */}
        {selectedCount > 0 && (
          <div className="mailListHeader-mailActions-items">
            <p>읽음</p>
            <p>삭제</p>
          </div>
        )}
      </div>

      {/* 정렬 옵션 */}
      <div className="mailListHeader-sortOptions">
        <div
          className="mailListHeader-sortOptions-items"
          onClick={toggleOption}
        >
          <p>정렬</p>
          <img
            className={`mailListHeader-sortOptions-arrow ${
              isSortOptionOpen ? "open" : ""
            }`}
            src="/src/assets/icons/arrow.svg"
            alt="화살표 아이콘"
          />
        </div>

        {isSortOptionOpen && (
          <div className="mailListHeader-sortOptions-container">
            <span onClick={() => handleSortOptionClick(SORT_OPTIONS.TIME)}>
              시간순 보기
            </span>
            <span onClick={() => handleSortOptionClick(SORT_OPTIONS.SENDER)}>
              받은사람 묶어보기
            </span>
          </div>
        )}
      </div>

      {/* 메일 기능 도구 (예: 답장, 전달 등) */}
      <div className="mailListHeader-mailTools"></div>

      {/* 검색창 */}
      <div className="mailListHeader-searchBar">
        <input />
        <img src="/src/assets/icons/search.svg" alt="검색 아이콘" />
      </div>
    </div>
  );
};
export default MailListHeader;
