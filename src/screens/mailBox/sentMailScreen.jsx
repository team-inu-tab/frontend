import "@screens/mailBox/css/mailScreen.css";
import MailDetail from "../../components/mailBox/mailDetail";
import MailDetailMax from "../../components/mailBox/mailDetailMax";
import MailPreviewContainer from "../../components/mailBox/mailPreviewContainer";
import SenderGroupedList from "../../components/mailBox/senderGroupedList";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { SORT_OPTIONS, useMailStore, useSortStore } from "../../store";
import { useInitMailbox } from "../../hooks/useInitMailbox";

const SentMailScreen = () => {
  useInitMailbox();

  const sortOption = useSortStore((state) => state.sortOption);
  const selectedGroup = useMailStore((state) => state.selectedGroup);
  const selectedMail = useMailStore((state) => state.selectedMail);
  const isExpanded = useMailStore((state) => state.isExpanded);
  const sentMails = useMailStore((state) => state.sentMails);
  const groupedSentMails = useMailStore((state) => state.groupedSentMails);
  const status = useMailStore((state) => state.status);

  return (
    <div className="MailScreen-container">
      {isExpanded ? (
        <MailDetailMax />
      ) : (
        <>
          {/* 왼쪽: 메일 목록 */}
          <div className="MailScreen-list">
            {status === "loading" ? (
              <p>📩 메일을 불러오는 중...</p>
            ) : sortOption === SORT_OPTIONS.TIME ? (
              <TimeSortedList mails={sentMails} />
            ) : (
              <SenderGroupedList mails={groupedSentMails} />
            )}
          </div>

          {/* 오른쪽: 선택된 항목에 따라 변경 */}
          <div className="MailScreen-preview">
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

export default SentMailScreen;
