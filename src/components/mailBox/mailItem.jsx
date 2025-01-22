import "@components/mailBox/css/mailItem.css";

const MailItem = ({
  isFileExist,
  sender,
  title,
  receiveAt,
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
        <div className="mailItem-title-container">
          {isFileExist && (
            <img
              className="mailItem-attachment"
              src="/src/assets/icons/attachment.svg"
              alt="Attachment icon for email"
            />
          )}
          <span className="mailItem-title">{title}</span>
        </div>
        <span className="mailItem-receiveAt">{receiveAt}</span>
      </div>
    </div>
  );
};

export default MailItem;
