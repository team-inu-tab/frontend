import "@components/mailBox/css/senderGroupedList.css";
import MailSenderGroup from "./mailSenderGroup";

const SenderGroupedList = ({ Mails }) => {
  return (
    <div className="senderGroupedList-wrapper">
      {Mails.map((group, index) => (
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
