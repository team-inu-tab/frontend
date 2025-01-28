import "@components/mailBox/css/senderGroupedList.css";
import SenderGroupedItem from "./senderGroupedItem";

const SenderGroupedList = ({ Mails }) => {
  return (
    <div className="senderGroupedList-wrapper">
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
