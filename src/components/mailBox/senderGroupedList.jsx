import "@components/mailBox/css/senderGroupedList.css";
import MailSenderGroup from "./mailSenderGroup";

const SenderGroupedList = ({ groupedMails }) => {
  return (
    <div className="senderGroupedList-wrapper">
      {groupedMails.map((group, index) => (
        <MailSenderGroup
          key={index}
          sender={group.sender}
          mailItems={group.mailItems}
        />
      ))}
    </div>
  );
};

export default SenderGroupedList;
