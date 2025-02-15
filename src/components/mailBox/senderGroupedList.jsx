import "@components/mailBox/css/senderGroupedList.css";
import SenderGroupedItem from "./senderGroupedItem";

/**
 * SenderGroupedList - 발신자별로 그룹화된 메일 목록을 표시하는 리스트 컴포넌트
 * @param {Array<Object>} props.Mails - 발신자별로 그룹화된 메일 목록
 * @param {string} props.Mails[].sender - 발신자 이름
 * @param {Array<Object>} props.Mails[].mailItems - 해당 발신자가 보낸 메일 목록
 * @returns {JSX.Element} 발신자별로 그룹화된 메일 리스트 UI
 */
const SenderGroupedList = ({ Mails }) => {
  return (
    <div className="senderGroupedList-wrapper">
      {/* 각 발신자의 메일 목록을 그룹화하여 렌더링 */}
      {Mails.map((group, index) => (
        <SenderGroupedItem
          key={index}
          sender={group.sender}
          mailItems={group.mailItems}
        />
      ))}
    </div>
  );
};

export default SenderGroupedList;
