import "@components/mailBox/css/mailListItem.css";
import useMailCheck from "@hooks/useMailCheck";
import { useContext } from "react";
import { MailContext } from "@contexts/MailContext";

const MailListItem = ({ mail }) => {
  const { toggleCheckbox } = useMailCheck();
  const { setSelectedMail } = useContext(MailContext);

  const handleSelectMail = (mail) => {
    setSelectedMail(mail); // 선택된 메일 설정
  };

  return (
    <div className="mailListItem-wrapper">
      <input
        className="mailListItem-checkBox"
        type="checkbox"
        checked={mail.isChecked}
        onChange={(e) => toggleCheckbox(mail.id, e.target.checked)}
      />
      <div
        className="mailListItem-mailInfo"
        onClick={() => handleSelectMail(mail)}
      >
        <span className="mailListItem-sender">{mail.sender}</span>
        <div className="mailListItem-title-container">
          {mail.isFileExist && (
            <img
              className="mailListItem-attachment"
              src="/src/assets/icons/attachment.svg"
              alt="Attachment icon for email"
            />
          )}
          <span className="mailListItem-title">{mail.title}</span>
        </div>
        <span className="mailListItem-receiveAt">{mail.receiveAt}</span>
      </div>
    </div>
  );
};

export default MailListItem;
