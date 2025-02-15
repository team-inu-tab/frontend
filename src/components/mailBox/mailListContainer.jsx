import "@components/mailBox/css/mailListContainer.css";
import SenderGroupedList from "./senderGroupedList";
import TimeSortedList from "./timeSortedList";

/**
 * MailListContainer - 메일 목록을 정렬 기준에 따라 표시하는 컨테이너 컴포넌트
 * @param {"time" | "sender"} props.sortBy - 정렬 기준 ('time': 시간순 정렬, 'sender': 발신자별 정렬)
 * @returns {JSX.Element} 정렬된 메일 목록을 포함하는 컨테이너
 */
const MailListContainer = ({ sortBy }) => {
  return (
    <div className="mailListContainer-wrapper">
      {/* 선택한 정렬 방식에 따라 다른 컴포넌트 렌더링 */}
      {sortBy === "sender" ? <SenderGroupedList /> : <TimeSortedList />}
    </div>
  );
};

export default MailListContainer;
