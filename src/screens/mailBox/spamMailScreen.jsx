import "@screens/mailBox/css/mailScreen.css";
import MailDetail from "../../components/mailBox/mailDetail";
import MailDetailMax from "../../components/mailBox/mailDetailMax";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useLoadMailbox } from "../../hooks/useLoadMailbox";
import { useMailStore } from "../../store";

const SpamMailScreen = () => {
  useLoadMailbox("spam");

  const selectedMail = useMailStore((state) => state.selectedMail);
  const isExpanded = useMailStore((state) => state.isExpanded);
  const spamMails = useMailStore((state) => state.spamMails);
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
            ) : (
              <TimeSortedList mails={spamMails} />
            )}
          </div>

          {/* 오른쪽: 메일 상세 내용 */}
          <div className="MailScreen-preview">
            {selectedMail ? <MailDetail /> : null}
          </div>
        </>
      )}
    </div>
  );
};

export default SpamMailScreen;
