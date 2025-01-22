import "@components/mailBox/css/mailSenderGroup.css";
import MailItem from "./mailItem";

const MailSenderGroup = ({ sender, mailItems }) => {
  return (
    <div className="mailSenderGroup-wrapper">
      <div className="mailSenderGroup-senderContainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
        >
          <circle cx="3" cy="3" r="3" fill="#A87CF6" />
        </svg>
        <span className="mailSenderGroup-sender">{sender}</span>
      </div>
      <div className="mailSenderGroup-Container">
        {mailItems.map((mail) => (
          <MailItem
            key={mail.id}
            isFileExist={mail.isFileExist}
            sender={mail.sender}
            title={mail.title}
            receiveAt={mail.receiveAt}
            isChecked={mail.isChecked}
            onCheck={mail.onCheck}
          />
        ))}
      </div>
    </div>
  );
};

export default MailSenderGroup;
