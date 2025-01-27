import "@components/mailBox/css/mailListItem.css";

const MailListItem = ({
  isFileExist,
  sender,
  title,
  receiveAt,
  isChecked,
  onCheck,
}) => {
  return (
    <div className="mailListItem-wrapper">
      <input
        className="mailListItem-checkBox"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onCheck(e.target.checked)}
      />
      <div className="mailListItem-mailInfo">
        <span className="mailListItem-sender">{sender}</span>
        <div className="mailListItem-title-container">
          {isFileExist && (
            <img
              className="mailListItem-attachment"
              src="/src/assets/icons/attachment.svg"
              alt="Attachment icon for email"
            />
          )}
          <span className="mailListItem-title">{title}</span>
        </div>
        <span className="mailListItem-receiveAt">{receiveAt}</span>
      </div>
    </div>
  );
};

export default MailListItem;
