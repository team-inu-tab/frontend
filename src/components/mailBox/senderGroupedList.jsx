import "@components/mailBox/css/senderGroupedList.css";
import SenderGroupedItem from "./senderGroupedItem";
import { useCheckboxStore } from "../../store";
import { useEffect } from "react";

// test데이터 - 보낸사람 묶어보기
const senderGroupedMails = [
  {
    sender: "John Doe보낸사람",
    mailItems: [
      {
        id: 1,
        title: "Meeting Reminder",
        content: "내용1",
        sender: "John Doe",
        receiveAt: "2025-01-22 10:00",
        isImportant: false,
        isFileExist: true,
      },
      {
        id: 2,
        title: "Project Update",
        content: "내용2",
        sender: "John Doe",
        receiveAt: "2025-01-22 11:00",
        isImportant: false,
        isFileExist: false,
      },
    ],
  },
  {
    sender: "Jane Smith보낸사람",
    mailItems: [
      {
        id: 3,
        title: "Budget Report",
        content: "내용3",
        sender: "Jane Smith",
        receiveAt: "2025-01-21 09:00",
        isImportant: false,
        isFileExist: true,
      },
    ],
  },
  {
    sender: "Alice Brown보낸사람",
    mailItems: [
      {
        id: 4,
        title: "Weekly Newsletter",
        content: "내용4",
        sender: "Alice Brown",
        receiveAt: "2025-01-20 14:30",
        isImportant: false,
        isFileExist: false,
      },
      {
        id: 5,
        title: "New Opportunities",
        content: "내용5",
        sender: "Alice Brown",
        receiveAt: "2025-01-20 16:00",
        isImportant: false,
        isFileExist: true,
      },
    ],
  },
];

/**
 * SenderGroupedList - 발신자별로 그룹화된 메일 목록을 표시하는 리스트 컴포넌트
 * @returns {JSX.Element} 발신자별로 그룹화된 메일 리스트 UI
 */
const SenderGroupedList = () => {
  const mails = useCheckboxStore((state) => state.mails);
  const setMails = useCheckboxStore((state) => state.setMails);

  useEffect(() => {
    setMails(senderGroupedMails);
  }, []);

  return (
    <div className="senderGroupedList-wrapper">
      {/* 각 발신자의 메일 목록을 그룹화하여 렌더링 */}
      {mails?.length > 0 ? (
        mails.map((group, index) => (
          <SenderGroupedItem
            key={index}
            sender={group.sender}
            mailItems={group.mailItems}
          />
        ))
      ) : (
        <p>📩 메일이 없습니다.</p>
      )}
    </div>
  );
};

export default SenderGroupedList;
