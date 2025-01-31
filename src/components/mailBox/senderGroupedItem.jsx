import "@components/mailBox/css/senderGroupedItem.css";
import MailListItem from "./mailListItem";

const SenderGroupedItem = ({ sender, mailItems }) => {
  return (
    <div className="senderGroupedItem-wrapper">
      <div className="senderGroupedItem-senderContainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
        >
          <circle cx="3" cy="3" r="3" fill="#A87CF6" />
        </svg>
        <span className="senderGroupedItem-sender">{sender}</span>
      </div>
      <div className="senderGroupedItem-Container">
        {mailItems.map((mail) => (
          <MailListItem
            key={mail.id}
            mailId={mail.id}
            isFileExist={mail.isFileExist}
            sender={mail.sender}
            title={mail.title}
            receiveAt={mail.receiveAt}
            isChecked={mail.isChecked}
          />
        ))}
      </div>
    </div>
  );
};

export default SenderGroupedItem;
