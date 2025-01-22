import "@components/mailBox/css/mailListContainer.css";
import SenderGroupedList from "./senderGroupedList";
import TimeSortedList from "./timeSortedList";

// test
const senderGroupedMails = [
  {
    sender: "John Doe",
    mailItems: [
      {
        id: "1",
        title: "Meeting Reminder",
        content: "내용1",
        sender: "John Doe",
        receiveAt: "2025-01-22 10:00",
        isImportant: false,
        isFileExist: true,
      },
      {
        id: "2",
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
    sender: "Jane Smith",
    mailItems: [
      {
        id: "3",
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
    sender: "Alice Brown",
    mailItems: [
      {
        id: "4",
        title: "Weekly Newsletter",
        content: "내용4",
        sender: "Alice Brown",
        receiveAt: "2025-01-20 14:30",
        isImportant: false,
        isFileExist: false,
      },
      {
        id: "5",
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
const timeSortedMails = [
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
  {
    id: 3,
    title: "Budget Report",
    content: "내용3",
    sender: "Jane Smith",
    receiveAt: "2025-01-21 09:00",
    isImportant: false,
    isFileExist: true,
  },
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
];

/**
 * MailListContainer 컴포넌트.
 * @param {"time" | "sender"} props.sortBy - 정렬 기준 ('time' 또는 'sender').
 * @returns
 */
const MailListContainer = ({ sortBy }) => {
  return (
    <div className="mailListContainer-wrapper">
      {sortBy === "sender" ? (
        <SenderGroupedList Mails={senderGroupedMails} />
      ) : (
        <TimeSortedList Mails={timeSortedMails} />
      )}
    </div>
  );
};

export default MailListContainer;
