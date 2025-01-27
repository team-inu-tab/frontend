import "@components/mailBox/css/timeSortedList.css";
import MailListItem from "./mailListItem";

const TimeSortedList = ({ Mails }) => {
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
        {Mails.map((group, index) => (
          <MailListItem
            key={index}
            isFileExist={group.isFileExist}
            sender={group.sender}
            title={group.title}
            receiveAt={group.receiveAt}
            isChecked={false}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSortedList;
