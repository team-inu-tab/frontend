import "@components/mailBox/css/mailListHeader.css";
import { useState } from "react";
import {
  useCheckboxStore,
  useSortStore,
  SORT_OPTIONS,
  useMailStore,
} from "../../store";
import Search from "@assets/icons/search.svg?react";
import Arrow from "@assets/icons/arrow.svg?react";
import { useLocation } from "react-router-dom";

/**
 * MailListHeader - 메일함 목록 상단의 헤더 컴포넌트
 * @returns {JSX.Element} 메일함 헤더
 */
const MailListHeader = () => {
  const location = useLocation();

  const changeSortOption = useSortStore((state) => state.changeSortOption);
  const checkAll = useCheckboxStore((state) => state.checkAll);
  const uncheckAll = useCheckboxStore((state) => state.uncheckAll);
  const isAllChecked = useCheckboxStore((state) => state.isAllChecked);
  const isIndeterminate = useCheckboxStore((state) => state.isIndeterminate);
  const receiveMails = useMailStore((state) => state.receiveMails);
  const sentMails = useMailStore((state) => state.sentMails);
  const draftMails = useMailStore((state) => state.draftMails);
  const importantMails = useMailStore((state) => state.importantMails);
  const deletedMails = useMailStore((state) => state.deletedMails);
  const scheduledMails = useMailStore((state) => state.scheduledMails);
  const selfSentMails = useMailStore((state) => state.selfSentMails);
  const spamMails = useMailStore((state) => state.spamMails);

  const [isSortOptionOpen, setIsSortOptionOpen] = useState(false); // 정렬 옵션 상태

  // 정렬 옵션 열림/닫힘 상태를 토글하는 함수
  const toggleOption = () => setIsSortOptionOpen((prev) => !prev);

  // 정렬 옵션을 변경하는 함수
  const handleSortOptionClick = (option) => {
    changeSortOption(option);
    toggleOption();
  };

  // 메일 기능 도구 기본값
  let mailTools = <></>;
  let boxType = "";
  let mails = [];

  /**
   * 현재 위치에 따라 헤더 내용 동적으로 변경
   */
  switch (true) {
    case location.pathname.includes("/receive"):
      boxType = "receive";
      mails = receiveMails;
      mailTools = (
        <>
          <button>답장</button>
          <button>전달</button>
          <button>중요</button>
          <button>스팸차단</button>
        </>
      );
      break;

    case location.pathname.includes("/important"):
      boxType = "important";
      mails = importantMails;
      mailTools = (
        <>
          <button>답장</button>
          <button>전달</button>
          <button>중요</button>
          <button>스팸차단</button>
        </>
      );
      break;

    case location.pathname.includes("/deleted"):
      boxType = "deleted";
      mails = deletedMails;
      mailTools = (
        <>
          <button>복원</button>
          <button>영구삭제</button>
          <button>스팸차단</button>
        </>
      );
      break;

    case location.pathname.includes("/draft"):
      boxType = "draft";
      mails = draftMails;
      mailTools = <></>;
      break;

    case location.pathname.includes("/scheduled"):
      boxType = "scheduled";
      mails = scheduledMails;
      mailTools = (
        <>
          <button>전달</button>
          <button>보내기취소</button>
          <button>시간변경</button>
        </>
      );
      break;

    case location.pathname.includes("/selfsent"):
      boxType = "selfsent";
      mails = selfSentMails;
      mailTools = (
        <>
          <button>전달</button>
          <button>중요</button>
          <button>수정</button>
        </>
      );
      break;

    case location.pathname.includes("/sent"):
      boxType = "sent";
      mails = sentMails;
      mailTools = (
        <>
          <button>답장</button>
          <button>전달</button>
          <button>중요</button>
        </>
      );
      break;

    case location.pathname.includes("/spam"):
      boxType = "spam";
      mails = spamMails;
      mailTools = (
        <>
          <button>영구삭제</button>
          <button>스팸해제</button>
        </>
      );
      break;

    default:
      mailTools = null;
  }

  const mailIds = mails.map((mail) => mail.id);

  const selectedCount = useCheckboxStore(
    (state) => state.checkedByBox[boxType]?.size || 0
  );

  return (
    <div className="mailListHeader-wrapper">
      <div className="mailListHeader-left">
        {/* 메일 선택 및 액션 버튼 */}
        <div className="mailListHeader-mailActions">
          {/* 전체 선택 체크박스 */}
          <label className="mailListHeader-custom-checkBox">
            <input
              type="checkbox"
              checked={isAllChecked(boxType, mailIds)}
              ref={(el) => {
                if (el) el.indeterminate = isIndeterminate(boxType, mailIds);
              }}
              onChange={(e) => {
                e.target.checked
                  ? checkAll(boxType, mailIds)
                  : uncheckAll(boxType);
              }}
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
