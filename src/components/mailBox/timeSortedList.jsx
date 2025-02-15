import "@components/mailBox/css/timeSortedList.css";
import MailListItem from "./mailListItem";
import useFetchMails from "@hooks/useFetchMails";
import { useContext } from "react";
import { MailContext } from "@contexts/MailContext";

/**
 * TimeSortedList - 시간순 정렬된 메일 목록을 표시하는 컴포넌트
 * @returns {JSX.Element} 시간순으로 정렬된 메일 리스트 UI
 */
const TimeSortedList = () => {
  useFetchMails(); // API를 호출하여 메일 목록 가져오기

  const { mails } = useContext(MailContext); // 전역 상태에서 메일 목록 가져오기

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
        {mails.map((mail) => (
          <MailListItem key={mail.id} mail={mail} />
        ))}
      </div>
    </div>
  );
};

export default TimeSortedList;
