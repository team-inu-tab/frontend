import "@components/mailBox/css/mailListContainer.css";
import SenderGroupedList from "./senderGroupedList";
import TimeSortedList from "./timeSortedList";

/**
 * MailListContainer 컴포넌트.
 * @param {"time" | "sender"} props.sortBy - 정렬 기준 ('time' 또는 'sender').
 * @returns
 */
const MailListContainer = ({ sortBy }) => {
  return (
    <div className="mailListContainer-wrapper">
      {sortBy === "sender" ? <SenderGroupedList /> : <TimeSortedList />}
    </div>
  );
};

export default MailListContainer;
