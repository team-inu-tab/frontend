import "@components/mailBox/css/mailItem.css";

const MailItem = ({
  hasAttachment,
  sender,
  subject,
  timestamp,
  isChecked,
  onCheck,
}) => {
  return (
    <div className="mailItem-wrapper">
      <input
        className="mailItem-checkBox"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onCheck(e.target.checked)}
      />
      <div className="mailItem-mailInfo">
        <span className="mailItem-sender">{sender}</span>
        <div className="mailItem-subject-container">
          {hasAttachment && (
            <img
              className="mailItem-attachment"
              src="/src/assets/icons/attachment.svg"
              alt="Attachment icon for email"
            />
          )}
          <span className="mailItem-subject">{subject}</span>
        </div>
        <span className="mailItem-timestamp">{timestamp}</span>
      </div>
    </div>
  );
};

export default MailItem;
