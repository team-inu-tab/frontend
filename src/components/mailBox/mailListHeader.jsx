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
import { useMailApi } from "../../hooks/useMailApi";
import { getMailBoxConfig } from "../../utils/getMailBoxConfig";

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
  const getCheckedIds = useCheckboxStore((state) => state.getCheckedIds);
  const receiveMails = useMailStore((state) => state.receiveMails);
  const sentMails = useMailStore((state) => state.sentMails);
  const draftMails = useMailStore((state) => state.draftMails);
  const importantMails = useMailStore((state) => state.importantMails);
  const deletedMails = useMailStore((state) => state.deletedMails);
  const scheduledMails = useMailStore((state) => state.scheduledMails);
  const selfSentMails = useMailStore((state) => state.selfSentMails);
  const spamMails = useMailStore((state) => state.spamMails);

  const { markAsSpam, unmarkAsSpam } = useMailApi();

  const [isSortOptionOpen, setIsSortOptionOpen] = useState(false); // 정렬 옵션 상태

  // 정렬 옵션 열림/닫힘 상태를 토글하는 함수
  const toggleOption = () => setIsSortOptionOpen((prev) => !prev);

  // 정렬 옵션을 변경하는 함수
  const handleSortOptionClick = (option) => {
    changeSortOption(option);
    toggleOption();
  };

  // boxType, mails 먼저 가져오기
  const { boxType, mails } = getMailBoxConfig({
    pathname: location.pathname,
    stores: {
      receiveMails,
      sentMails,
      draftMails,
      importantMails,
      deletedMails,
      scheduledMails,
      selfSentMails,
      spamMails,
    },
    actions: {},
  });

  // 스팸 차단
  const handleMarkSpam = async () => {
    const ids = getCheckedIds(boxType);
    try {
      await Promise.all(ids.map((id) => markAsSpam(id)));
      uncheckAll(boxType);
      alert("스팸 등록 완료!");
    } catch {
      alert("스팸 등록 실패");
    }
  };

  // 스팸 해제
  const handleUnmarkSpam = async () => {
    const ids = getCheckedIds(boxType);
    try {
      await Promise.all(ids.map((id) => unmarkAsSpam(id)));
      uncheckAll(boxType);
      alert("스팸 해제 완료!");
    } catch {
      alert("스팸 해제 실패");
    }
  };

  // mailTools 재계산
  const { mailTools } = getMailBoxConfig({
    pathname: location.pathname,
    stores: {
      receiveMails,
      sentMails,
      draftMails,
      importantMails,
      deletedMails,
      scheduledMails,
      selfSentMails,
      spamMails,
    },
    actions: {
      handleMarkSpam,
      handleUnmarkSpam,
    },
  });

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
