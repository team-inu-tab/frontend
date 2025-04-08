import "@screens/mailBox/css/mailScreen.css";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useSortStore, SORT_OPTIONS, useMailStore } from "../../store";
import SenderGroupedList from "../../components/mailBox/senderGroupedList";
import MailPreviewContainer from "../../components/mailBox/mailPreviewContainer";
import MailDetail from "../../components/mailBox/mailDetail";
import MailDetailMax from "../../components/mailBox/mailDetailMax";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMailApi } from "../../hooks/useMailApi";

const SearchMailScreen = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [searchResults, setSearchResults] = useState([]);

  const sortOption = useSortStore((state) => state.sortOption);
  const selectedMail = useMailStore((state) => state.selectedMail);
  const isExpanded = useMailStore((state) => state.isExpanded);

  const { searchMailsByUserEmail } = useMailApi();

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        const res = await searchMailsByUserEmail(query);
        setSearchResults(res.emails);
      } catch (e) {
        console.error("검색 실패", e);
      }
    };
    fetchData();
  }, [query]);

  if (!query) return <div>검색어를 입력해주세요.</div>;

  return (
    <div className="MailScreen-container">
      {isExpanded ? (
        <MailDetailMax />
      ) : (
        <>
          {/* 왼쪽: 메일 목록 */}
          <div className="MailScreen-list">
            {sortOption === SORT_OPTIONS.TIME ? (
              <TimeSortedList mails={searchResults} />
            ) : (
              <SenderGroupedList mails={searchResults} />
            )}
          </div>

          {/* 오른쪽: 선택된 항목에 따라 변경 */}
          <div className="MailScreen-preview">
            {sortOption === SORT_OPTIONS.SENDER ? (
              <MailPreviewContainer />
            ) : selectedMail ? (
              <MailDetail />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchMailScreen;
