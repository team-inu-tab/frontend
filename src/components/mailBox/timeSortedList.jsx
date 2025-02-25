import "@components/mailBox/css/timeSortedList.css";
import MailListItem from "./mailListItem";
import { useCheckboxStore } from "../../store";
import { useEffect } from "react";

// test데이터 - 시간순
const timeSortedMails = [
  {
    id: 1,
    title: "Meeting Reminder",
    content: "내용1",
    sender: "John Doe시간순",
    receiveAt: "2025-01-22 10:00",
    isImportant: false,
    isFileExist: true,
  },
  {
    id: 2,
    title: "Project Update",
    content: "내용2",
    sender: "John Doe시간순",
    receiveAt: "2025-01-22 11:00",
    isImportant: false,
    isFileExist: false,
  },
  {
    id: 3,
    title: "Budget Report",
    content: "내용3",
    sender: "Jane Smith시간순",
    receiveAt: "2025-01-21 09:00",
    isImportant: false,
    isFileExist: true,
  },
  {
    id: 4,
    title: "Weekly Newsletter",
    content: "내용4",
    sender: "Alice Brown시간순",
    receiveAt: "2025-01-20 14:30",
    isImportant: false,
    isFileExist: false,
  },
  {
    id: 5,
    title: "New Opportunities",
    content: "내용5",
    sender: "Alice Brown시간순",
    receiveAt: "2025-01-20 16:00",
    isImportant: false,
    isFileExist: true,
  },
];

/**
 * TimeSortedList - 시간순 정렬된 메일 목록을 표시하는 컴포넌트
 * @returns {JSX.Element} 시간순으로 정렬된 메일 리스트 UI
 */
const TimeSortedList = () => {
  const mails = useCheckboxStore((state) => state.mails);
  const setMails = useCheckboxStore((state) => state.setMails);

  useEffect(() => {
    setMails(timeSortedMails);
  }, []);

  return (
    <div className="timeSortedList-wrapper">
      {/* 헤더: "시간순 보기" 라벨 및 아이콘 */}
      <div className="timeSortedList-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
        >
          <circle cx="3" cy="3" r="3" fill="#A87CF6" />
        </svg>
        <span className="timeSortedList-title">시간순 보기</span>
      </div>

      {/* 메일 목록 컨테이너 */}
      <div className="timeSortedList-container">
        {mails?.length > 0 ? (
          mails.map((mail) => <MailListItem key={mail.id} mail={mail} />)
        ) : (
          <p>📩 메일이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default TimeSortedList;
