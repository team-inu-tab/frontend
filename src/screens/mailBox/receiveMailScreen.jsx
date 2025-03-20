import "@screens/mailBox/css/receiveMailScreen.css";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useSortStore, SORT_OPTIONS, useMailStore } from "../../store";
import SenderGroupedList from "../../components/mailBox/senderGroupedList";
import MailPreviewContainer from "../../components/mailBox/mailPreviewContainer";
import MailDetail from "../../components/mailBox/mailDetail";
import MailDetailMax from "../../components/mailBox/mailDetailMax";
import { useEffect } from "react";

const ReceiveMailScreen = () => {
  const sortOption = useSortStore((state) => state.sortOption);
  const selectedGroup = useMailStore((state) => state.selectedGroup);
  const selectedMail = useMailStore((state) => state.selectedMail);
  const isExpanded = useMailStore((state) => state.isExpanded);
  const { receivedMails, fetchReceivedMails, status, error } = useMailStore();

  useEffect(() => {
    fetchReceivedMails();
  }, [fetchReceivedMails]);

  return (
    <div className="receiveMailScreen-container">
      {isExpanded ? (
        <MailDetailMax />
      ) : (
        <>
          {/* 왼쪽: 메일 목록 */}
          <div className="receiveMailScreen-list">
            {status === "loading" ? (
              <p>📩 메일을 불러오는 중...</p>
            ) : error ? (
              <p>오류: {error}</p>
            ) : sortOption === SORT_OPTIONS.TIME ? (
              <TimeSortedList mails={receivedMails} />
            ) : (
              <SenderGroupedList />
            )}
          </div>

          {/* 오른쪽: 선택된 항목에 따라 변경 */}
          <div className="receiveMailScreen-preview">
            {sortOption === SORT_OPTIONS.SENDER && selectedGroup.length > 0 ? (
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

export default ReceiveMailScreen;
