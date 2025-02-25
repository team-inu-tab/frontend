import "@components/mailBox/css/mailPreviewItem.css";

/**
 * MailPreviewItem - 메일 미리보기 항목을 표시하는 컴포넌트
 * @param {boolean} props.isSentByMe - 사용자가 보낸 메일인지 여부
 * @returns {JSX.Element} 메일 미리보기 UI
 */
const MailPreviewItem = ({ isSentByMe = true, mail }) => {
  return (
    <div className={`mailPreviewItem-wrapper ${isSentByMe ? "" : "received"}`}>
      <div
        className={`mailPreviewItem-container ${isSentByMe ? "" : "received"}`}
      >
        {/* 메일 제목 및 작성자 정보 */}
        <div
          className={`mailPreviewItem-header ${isSentByMe ? "" : "received"}`}
        >
          <div
            className={`mailPreviewItem-header-container ${
              isSentByMe ? "" : "received"
            }`}
          >
            <span className="mailPreviewItem-title">{mail.title}</span>
            <span className="mailPreviewItem-sender">
              작성자: {mail.sender}
            </span>
          </div>

          {/* 확장 버튼 */}
          <img
            className={`mailPreviewItem-arrow ${isSentByMe ? "" : "received"}`}
            src="/src/assets/icons/expandArrow.svg"
            alt="Expand Arrow"
          />
        </div>

        {/* 메일 내용 (미리보기) */}
        <div className="mailPreviewItem-content">{mail.content}</div>
      </div>

      {/* 메일 수신 시간 */}
      <div className="mailPreviewItem-footer">
        <span
          className={`mailPreviewItem-receiveAt ${
            isSentByMe ? "" : "received"
          }`}
        >
          {mail.receiveAt} 수신
        </span>
      </div>
    </div>
  );
};
export default MailPreviewItem;
