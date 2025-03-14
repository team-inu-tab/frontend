import "@components/mailBox/css/mailPreviewItem.css";
import { useMailStore } from "../../store";
import ExpandArrow from "@assets/icons/expandArrow.svg?react";

/**
 * MailPreviewItem - 메일 미리보기 항목을 표시하는 컴포넌트
 * @param {boolean} props.isSentByMe - 사용자가 보낸 메일인지 여부
 * @returns {JSX.Element} 메일 미리보기 UI
 */
const MailPreviewItem = ({ mail }) => {
  const isSentByMe = mail.isSentByMe;

  const toggleExpanded = useMailStore((state) => state.toggleExpanded);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail); // 현재 선택된 메일을 설정하는 함수

  // 선택된 메일 업데이트 함수
  const handleSelectMail = (mail) => {
    setSelectedMail(mail);
  };

  return (
    <div
      className={`mailPreviewItem-wrapper ${
        isSentByMe === true ? "" : "received"
      }`}
      onClick={() => handleSelectMail(mail)}
    >
      <div
        className={`mailPreviewItem-container ${
          isSentByMe === true ? "" : "received"
        }`}
      >
        {/* 메일 제목 및 작성자 정보 */}
        <div
          className={`mailPreviewItem-header ${
            isSentByMe === true ? "" : "received"
          }`}
        >
          <div
            className={`mailPreviewItem-header-container ${
              isSentByMe === true ? "" : "received"
            }`}
          >
            <span className="mailPreviewItem-title">{mail.title}</span>
            <span className="mailPreviewItem-sender">
              작성자: {mail.sender}
            </span>
          </div>

          {/* 확장 버튼 */}
          <ExpandArrow
            className={`mailPreviewItem-arrow ${
              isSentByMe === true ? "" : "received"
            }`}
            onClick={toggleExpanded}
          />
        </div>

        {/* 메일 내용 (미리보기) */}
        <div className="mailPreviewItem-content">{mail.content}</div>

        {/* 메일 수신 시간 */}
        <div className="mailPreviewItem-footer">
          <span
            className={`mailPreviewItem-receiveAt ${
              isSentByMe === true ? "" : "received"
            }`}
          >
            {mail.receiveAt} 수신
          </span>
        </div>
      </div>
    </div>
  );
};
export default MailPreviewItem;
