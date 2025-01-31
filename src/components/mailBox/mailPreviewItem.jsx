import "@components/mailBox/css/mailPreviewItem.css";

// test
const mailData = {
  title: "캡스톤디자인1 사전 신청안내",
  content: `Apple의 system-ui가 익숙한 나로서는 San Francisco와 Apple SD 산돌고딕 Neo가 없는 다른 환경에서 이를 대체할 수 있는 글꼴을 꾸준히 감행해야 했다.`,
  sender: "나",
  receiver: "팀원들",
  sendAt: "2024.11.24 21:21",
  receiveAt: "2024.11.24 21:22",
  isImportant: true,
  file: ["20220101.pdf", "20220102.pdf", "20220103.pdf"],
};
const MailPreviewItem = ({ isSentByMe }) => {
  return (
    <div className={`mailPreviewItem-wrapper ${isSentByMe ? "" : "received"}`}>
      <div
        className={`mailPreviewItem-container ${isSentByMe ? "" : "received"}`}
      >
        {/* 메일 제목 */}
        <div
          className={`mailPreviewItem-header ${isSentByMe ? "" : "received"}`}
        >
          <div
            className={`mailPreviewItem-header-container ${
              isSentByMe ? "" : "received"
            }`}
          >
            <span className="mailPreviewItem-title">{mailData.title}</span>
            <span className="mailPreviewItem-sender">
              작성자: {mailData.sender}
            </span>
          </div>
          <img
            className={`mailPreviewItem-arrow ${isSentByMe ? "" : "received"}`}
            src="/src/assets/icons/expandArrow.svg"
            alt="Expand Arrow"
          />
        </div>

        {/* 메일 내용 */}
        <div className="mailPreviewItem-content">{mailData.content}</div>
      </div>
      {/* 메일 시간 정보 */}
      <div className="mailPreviewItem-footer">
        <span
          className={`mailPreviewItem-receiveAt ${
            isSentByMe ? "" : "received"
          }`}
        >
          {mailData.receiveAt} 수신
        </span>
      </div>
    </div>
  );
};
export default MailPreviewItem;
