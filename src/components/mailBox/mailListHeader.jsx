import "@components/mailBox/css/mailListHeader.css";
import useMailCheck from "@hooks/useMailCheck";
import { useContext, useState } from "react";
import { SortContext } from "../../contexts/SortContext";

/**
 * MailListHeader - 메일함 목록 상단의 헤더 컴포넌트
 * @returns {JSX.Element} 메일함 헤더
 */
const MailListHeader = () => {
  const { selectedCount, selectAll } = useMailCheck(); // 메일 선택 관련 기능 가져오기
  const { ChangeSortOption } = useContext(SortContext);
  const [isSortOptionOpen, setIsSortOptionOpen] = useState(false);

  /**
   * 정렬 옵션 열림/닫힘 상태를 토글하는 함수
   */
  const toggleOption = () => setIsSortOptionOpen((prev) => !prev);

  const HandleSortOptionClick = (option) => {
    ChangeSortOption(option);
    toggleOption();
  };

  return (
    <div className="mailListHeader-wrapper">
      {/* 메일 선택 및 액션 버튼 */}
      <div className="mailListHeader-mailActions">
        {/* 전체 선택 체크박스 */}
        <input type="checkbox" onChange={(e) => selectAll(e.target.checked)} />
        <p>전체선택</p>

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
            <span onClick={() => HandleSortOptionClick("time")}>
              시간순 보기
            </span>
            <span onClick={() => HandleSortOptionClick("sender")}>
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
