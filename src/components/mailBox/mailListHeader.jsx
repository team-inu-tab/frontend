import "@components/mailBox/css/mailListHeader.css";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useCheckboxStore,
  useSortStore,
  SORT_OPTIONS,
  useMailStore,
} from "../../store";
import Search from "@assets/icons/search.svg?react";
import Arrow from "@assets/icons/arrow.svg?react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMailApi } from "../../hooks/useMailApi";
import { getMailBoxConfig } from "../../utils/getMailBoxConfig";
import { useLoadMailbox } from "../../hooks/useLoadMailbox";

/**
 * MailListHeader - 메일함 목록 상단의 헤더 컴포넌트
 * @returns {JSX.Element} 메일함 헤더
 */
const MailListHeader = () => {
  const location = useLocation();
  const checkboxRef = useRef(null);
  const navigate = useNavigate();
  const loadMailbox = useLoadMailbox();

  const [isSortOptionOpen, setIsSortOptionOpen] = useState(false); // 정렬 옵션 상태
  const [searchInput, setSearchInput] = useState(""); // 검색어
  const [isLoading, setIsLoading] = useState(false);

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

  const {
    markAsSpam,
    unmarkAsSpam,
    deleteTemporaryMails,
    deletePermanentMails,
    deleteDraftMail,
  } = useMailApi();

  // 정렬 옵션 열림/닫힘 상태를 토글하는 함수
  const toggleOption = () => setIsSortOptionOpen((prev) => !prev);

  // 정렬 옵션을 변경하는 함수
  const handleSortOptionClick = (option) => {
    changeSortOption(option);
    toggleOption();
  };

  // 페이지 이동할 때 검색창 초기화
  useEffect(() => {
    const isSearchPage = location.pathname.includes("/mail/search");
    if (!isSearchPage) {
      setSearchInput("");
    }
  }, [location.pathname]);

  // 1. boxType, mails, isSortOption 먼저 가져오기
  const { boxType, mails, isSortOption } = getMailBoxConfig({
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

  const mailIds = useMemo(() => mails?.map((mail) => mail.id) || [], [mails]);

  // 메일함 새로고침 함수
  const refreshMailbox = async () => {
    setIsLoading(true);
    try {
      // 메일 목록 다시 가져오기
      await loadMailbox(boxType);
      // 체크박스 상태 초기화
      uncheckAll(boxType);
    } catch (error) {
      console.error("메일함 새로고침 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 스팸 차단
  const handleMarkSpam = async () => {
    const ids = getCheckedIds(boxType);
    try {
      await Promise.all(ids.map((id) => markAsSpam(id)));
      await refreshMailbox();
      alert("스팸 등록 완료!");
    } catch (error) {
      console.error("스팸 등록 실패:", error);
      alert("스팸 등록 실패");
    }
  };

  // 스팸 해제
  const handleUnmarkSpam = async () => {
    const ids = getCheckedIds(boxType);
    try {
      await Promise.all(ids.map((id) => unmarkAsSpam(id)));
      await refreshMailbox();
      alert("스팸 해제 완료!");
    } catch (error) {
      console.error("스팸 해제 실패:", error);
      alert("스팸 해제 실패");
    }
  };

  // 메일 삭제 (임시)
  const handleDeleteTemporary = async () => {
    const ids = getCheckedIds(boxType);
    try {
      await deleteTemporaryMails(ids);
      await refreshMailbox();
      alert("휴지통으로 이동했습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 실패");
    }
  };

  // 메일 삭제 (영구)
  const handleDeletePermanent = async () => {
    const ids = getCheckedIds(boxType);
    try {
      await deletePermanentMails(ids);
      await refreshMailbox();
      alert("영구 삭제 완료!");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 실패");
    }
  };

  // 임시 메일 삭제
  const handleDeleteDraft = async () => {
    const ids = getCheckedIds(boxType);
    try {
      await deleteDraftMail(ids);
      await refreshMailbox();
      alert("영구 삭제 완료!");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 실패");
    }
  };

  // 헤더 삭제 버튼 클릭 시 - 임시 메일함일 경우 임시 메일 삭제
  const handleDelete = () => {
    if (boxType === "draft") {
      handleDeleteDraft();
    } else handleDeleteTemporary();
  };

  // 이메일 검색
  const handleSearch = () => {
    if (!searchInput.trim()) return;
    navigate(`/mail/search?query=${encodeURIComponent(searchInput.trim())}`);
  };

  // 2. mailTools 재계산
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
      handleDeletePermanent,
    },
  });

  const selectedCount = useCheckboxStore(
    (state) => state.checkedByBox[boxType]?.size || 0
  );

  // 체크박스 상태 동기화
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate(boxType, mailIds);
      checkboxRef.current.checked = isAllChecked(boxType, mailIds);
    }
  }, [boxType, mailIds, isIndeterminate, isAllChecked]);

  // 전체 선택/해제 핸들러
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      checkAll(boxType, mailIds);
    } else {
      uncheckAll(boxType);
    }
  };

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
              ref={checkboxRef}
              onChange={handleSelectAll}
              disabled={isLoading}
            />
            <span className="checkmark"></span>
          </label>

          <button
            className={`mailActions-items ${
              selectedCount > 0 ? "selected" : ""
            }`}
            disabled={isLoading}
          >
            읽음
          </button>
          <button
            className={`mailActions-items ${
              selectedCount > 0 ? "selected" : ""
            }`}
            onClick={handleDelete}
            disabled={isLoading}
          >
            삭제
          </button>
        </div>

        {/* 정렬 옵션 */}
        {isSortOption && (
          <div className="mailListHeader-sortOptions">
            <button
              className="mailListHeader-sortOptions-items"
              onClick={toggleOption}
              disabled={isLoading}
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
        )}

        {/* 메일 기능 도구 (예: 답장, 전달 등) */}
        <div className="mailListHeader-mailTools">{mailTools}</div>
      </div>

      {/* 검색창 */}
      <div className="mailListHeader-searchBar">
        <input
          type="text"
          className="search-input"
          placeholder="이메일 검색"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          disabled={isLoading}
        />
        <Search className="search-icon" onClick={handleSearch} />
      </div>
    </div>
  );
};
export default MailListHeader;
