import "@components/mailBox/css/mailListHeader.css";
import { useState } from "react";
import { useCheckboxStore, useSortStore, SORT_OPTIONS } from "../../store";
import Search from "@assets/icons/search.svg?react";
import Arrow from "@assets/icons/arrow.svg?react";
import { useLocation } from "react-router-dom";

/**
 * MailListHeader - 메일함 목록 상단의 헤더 컴포넌트
 * @returns {JSX.Element} 메일함 헤더
 */
const MailListHeader = () => {
  const location = useLocation();

  const selectedCount = useCheckboxStore((state) => state.selectedCount);
  const selectAll = useCheckboxStore((state) => state.selectAll);
  const changeSortOption = useSortStore((state) => state.changeSortOption);

  const [isSortOptionOpen, setIsSortOptionOpen] = useState(false);

  // 메일 기능 도구 기본값
  let mailTools = (
    <>
      <button>답장</button>
      <button>전달</button>
      <button>중요</button>
      <button>스팸차단</button>
    </>
  );

  // 정렬 옵션 열림/닫힘 상태를 토글하는 함수
  const toggleOption = () => setIsSortOptionOpen((prev) => !prev);

  // 정렬 옵션을 변경하는 함수
  const handleSortOptionClick = (option) => {
    changeSortOption(option);
    toggleOption();
  };

  /**
   * 현재 위치에 따라 헤더 내용 동적으로 변경
   */
  if (location.pathname.includes("/deleted")) {
    mailTools = (
      <>
        <button>복원</button>
        <button>영구삭제</button>
        <button>스팸차단</button>
      </>
    );
  } else if (location.pathname.includes("/draft")) {
    mailTools = <></>;
  } else if (location.pathname.includes("/scheduled")) {
    mailTools = (
      <>
        <button>전달</button>
        <button>보내기취소</button>
        <button>시간변경</button>
      </>
    );
  } else if (location.pathname.includes("/selfsent")) {
    mailTools = (
      <>
        <button>전달</button>
        <button>중요</button>
        <button>수정</button>
      </>
    );
  } else if (location.pathname.includes("/sent")) {
    mailTools = (
      <>
        <button>답장</button>
        <button>전달</button>
        <button>중요</button>
      </>
    );
  } else if (location.pathname.includes("/spam")) {
    mailTools = (
      <>
        <button>영구삭제</button>
        <button>스팸해제</button>
      </>
    );
  }

  return (
    <div className="mailListHeader-wrapper">
      <div className="mailListHeader-left">
        {/* 메일 선택 및 액션 버튼 */}
        <div className="mailListHeader-mailActions">
          {/* 전체 선택 체크박스 */}
          <label className="mailListHeader-custom-checkBox">
            <input
              type="checkbox"
              onChange={(e) => selectAll(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>

          <button
            className={`mailActions-items ${
              selectedCount > 0 ? "selected" : ""
            }`}
          >
            읽음
          </button>
          <button
            className={`mailActions-items ${
              selectedCount > 0 ? "selected" : ""
            }`}
          >
            삭제
          </button>
        </div>

        {/* 정렬 옵션 */}
        <div className="mailListHeader-sortOptions">
          <button
            className="mailListHeader-sortOptions-items"
            onClick={toggleOption}
          >
            정렬
            <Arrow
              className={`mailListHeader-sortOptions-arrow ${
                isSortOptionOpen ? "open" : ""
              }`}
            />
          </button>

          {isSortOptionOpen && (
            <div className="mailListHeader-sortOptions-container">
              <p onClick={() => handleSortOptionClick(SORT_OPTIONS.TIME)}>
                시간순 보기
              </p>
              <p onClick={() => handleSortOptionClick(SORT_OPTIONS.SENDER)}>
                받은사람 묶어보기
              </p>
            </div>
          )}
        </div>

        {/* 메일 기능 도구 (예: 답장, 전달 등) */}
        <div className="mailListHeader-mailTools">{mailTools}</div>
      </div>

      {/* 검색창 */}
      <div className="mailListHeader-searchBar">
        <input type="text" className="search-input" placeholder="메일 검색" />
        <Search className="search-icon" />
      </div>
    </div>
  );
};
export default MailListHeader;
