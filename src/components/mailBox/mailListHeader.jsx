import "@components/mailBox/css/mailListHeader.css";
import useMailCheck from "@hooks/useMailCheck";
import { useState } from "react";

/**
 * MailListHeader - 메일함 목록 상단의 헤더 컴포넌트
 * @returns {JSX.Element} 메일함 헤더
 */
const MailListHeader = () => {
  const { selectedCount, selectAll } = useMailCheck(); // 메일 선택 관련 기능 가져오기
  const [isSortOptionOpen, setIsSortOptionOpen] = useState(false);

  /**
   * 정렬 옵션 열림/닫힘 상태를 토글하는 함수
   */
  const toggleOption = () => setIsSortOptionOpen((prev) => !prev);

  return (
    <div className="mailListHeader-wrapper">
      {/* 메일 선택 및 액션 버튼 */}
      <div className="mailActions-wrapper">
        {/* 전체 선택 체크박스 */}
        <input type="checkbox" onChange={(e) => selectAll(e.target.checked)} />
        <p>전체선택</p>

        {/* 선택된 메일이 있을 경우 "읽음", "삭제" 버튼 표시 */}
        {selectedCount > 0 && (
          <div className="mailActions-container">
            <p>읽음</p>
            <p>삭제</p>
          </div>
        )}
      </div>

      {/* 정렬 옵션 */}
      <div className="sortOptions">
        <p onClick={toggleOption}>정렬</p>
        {isSortOptionOpen ? (
          <div className="sortOptions-items">
            <p>시간순 보기</p>
            <p>받은사람 묶어보기</p>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* 메일 기능 도구 (예: 답장, 전달 등) */}
      <div className="mailTools"></div>

      {/* 검색창 */}
      <div className="searchBar">검색</div>
    </div>
  );
};
export default MailListHeader;
