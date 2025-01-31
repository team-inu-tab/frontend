import "@components/mailBox/css/timeSortedList.css";
import MailListItem from "./mailListItem";
import useFetchMails from "@hooks/useFetchMails";
import { useContext } from "react";
import { MailContext } from "@contexts/MailContext";

const TimeSortedList = () => {
  // API 호출
  useFetchMails();

  const { mails } = useContext(MailContext);

  return (
    <div className="timeSortedList-wrapper">
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
      <div className="timeSortedList-container">
        {mails.map((mail) => (
          <MailListItem key={mail.id} mail={mail} />
        ))}
      </div>
    </div>
  );
};

export default TimeSortedList;
