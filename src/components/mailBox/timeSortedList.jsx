import "@components/mailBox/css/timeSortedList.css";
import Arrow from "@assets/icons/arrow_more.svg?react";
import MailListItem from "./mailListItem";
import SkeletonMailListItem from "./skeletonMailListItem";
import { useMailStore } from "../../store";
import { usePaginatedMailbox } from "../../hooks/usePaginatedMailbox";

/**
 * TimeSortedList - 시간순 정렬된 메일 목록을 표시하는 컴포넌트
 * @returns {JSX.Element} 시간순으로 정렬된 메일 리스트 UI
 */
const TimeSortedList = ({ mails, boxType }) => {
  const status = useMailStore((state) => state.status);
  const nextToken = useMailStore((s) => s.nextPageTokenByBox[boxType]);

  const { fetchMoreMails } = usePaginatedMailbox();

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
        {status === "loading" ? (
          <>
            {[...Array(5)].map((_, idx) => (
              <SkeletonMailListItem key={idx} />
            ))}
          </>
        ) : mails && mails.length > 0 ? (
          <>
            {mails.map((mail) => (
              <MailListItem key={mail.id} mail={mail} />
            ))}
            {nextToken && (
              <div
                className="loadMore-wrapper"
                onClick={() => fetchMoreMails(boxType)}
              >
                <Arrow className="loadMore-icon" />
              </div>
            )}
          </>
        ) : (
          <p>📩 메일이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default TimeSortedList;
