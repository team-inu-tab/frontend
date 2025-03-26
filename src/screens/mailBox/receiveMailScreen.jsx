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

export const mockSelectedGroup = [
  {
    id: "email-001",
    title: "팀 회의 일정 조정",
    content: "다음 주 회의 일정 확인 바랍니다.",
    sender: "김철수",
    receiver: "me@example.com",
    receiveAt: "2025-03-20T10:00:00",
    isImportant: true,
    fileNameList: [],
  },
  {
    id: "email-002",
    title: "RE: 팀 회의 일정 조정",
    content: "확인했습니다. 회의실 예약하겠습니다.",
    sender: "me@example.com",
    receiver: "김철수",
    receiveAt: "2025-03-20T11:00:00",
    isImportant: false,
    fileNameList: [],
  },
];

export const mockGroupedReceiveMails = [
  {
    sender: "김철수",
    mailItems: [
      {
        id: "email-101",
        title: "회의록 공유드립니다",
        content: "회의록은 첨부파일 확인 부탁드립니다.",
        sender: "김철수",
        receiver: "me@example.com",
        receiveAt: "2025-03-18T09:15:00",
        isImportant: false,
        fileNameList: [{ fileName: "회의록.pdf", attachmentId: "att-001" }],
      },
    ],
  },
  {
    sender: "이영희",
    mailItems: [
      {
        id: "email-102",
        title: "점심 약속 확인",
        content: "내일 12시에 괜찮으신가요?",
        sender: "이영희",
        receiver: "me@example.com",
        receiveAt: "2025-03-19T13:00:00",
        isImportant: false,
        fileNameList: [],
      },
      {
        id: "email-103",
        title: "RE: 점심 약속 확인",
        content: "네 괜찮습니다. 장소는 어디로 할까요?",
        sender: "me@example.com",
        receiver: "이영희",
        receiveAt: "2025-03-19T13:30:00",
        isImportant: false,
        fileNameList: [],
      },
    ],
  },
  {
    sender: "네이버 고객센터",
    mailItems: [
      {
        id: "email-104",
        title: "[중요] 비밀번호 변경 안내",
        content: "보안 강화를 위해 비밀번호 변경을 권장드립니다.",
        sender: "네이버 고객센터",
        receiver: "me@example.com",
        receiveAt: "2025-03-17T08:00:00",
        isImportant: true,
        fileNameList: [],
      },
    ],
  },
];

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

  // 메일 클릭 후 모바일이면 preview 모드로 전환
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
              <TimeSortedList mails={mockSelectedGroup} />
            ) : (
              <SenderGroupedList mails={mockGroupedReceiveMails} />
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
