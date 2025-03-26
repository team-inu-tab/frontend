import "@screens/mailBox/css/mailScreen.css";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useSortStore, SORT_OPTIONS, useMailStore } from "../../store";
import SenderGroupedList from "../../components/mailBox/senderGroupedList";
import MailPreviewContainer from "../../components/mailBox/mailPreviewContainer";
import MailDetail from "../../components/mailBox/mailDetail";
import MailDetailMax from "../../components/mailBox/mailDetailMax";
import { useLoadMailbox } from "../../hooks/useLoadMailbox";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

const ReceiveMailScreen = () => {
  useLoadMailbox("receive");

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const [showPreview, setShowPreview] = useState(false);

  const sortOption = useSortStore((state) => state.sortOption);
  const selectedGroup = useMailStore((state) => state.selectedGroup);
  const selectedMailId = useMailStore((state) => state.selectedMailId);
  const isExpanded = useMailStore((state) => state.isExpanded);
  const receiveMails = useMailStore((state) => state.receiveMails);
  const groupedReceiveMails = useMailStore(
    (state) => state.groupedReceiveMails
  );
  const status = useMailStore((state) => state.status);

  useEffect(() => {
    if (isMobile && (selectedMailId || selectedGroup.length > 0)) {
      setShowPreview(true);
    }
  }, [selectedMailId, selectedGroup, isMobile]);

  return (
    <div
      className={`MailScreen-container ${
        isMobile && showPreview ? "show-preview" : ""
      }`}
    >
      {isExpanded ? (
        <MailDetailMax />
      ) : (
        <>
          {/* 왼쪽: 메일 목록 */}
          <div className="MailScreen-list">
            {status === "loading" ? (
              <p>📩 메일을 불러오는 중...</p>
            ) : sortOption === SORT_OPTIONS.TIME ? (
              <TimeSortedList mails={receiveMails} />
            ) : (
              <SenderGroupedList mails={groupedReceiveMails} />
            )}
          </div>

          {/* 오른쪽: 선택된 항목에 따라 변경 */}
          <div className="MailScreen-preview">
            {sortOption === SORT_OPTIONS.SENDER && selectedGroup.length > 0 ? (
              <MailPreviewContainer />
            ) : selectedMailId ? (
              <MailDetail />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default ReceiveMailScreen;
