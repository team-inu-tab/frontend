import "@components/mailBox/css/mailDetail.css";
import FileItem from "./fileItem";

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

const MailDetail = () => {
  return (
    <div className="mailDetail-wrapper">
      <div className="mailDetail-container">
        {/* 메일 제목 */}
        <div className="mailDetail-header">
          <h1 className="mailDetail-title">{mailData.title}</h1>
          <div className="mailDetail-info">
            <span className="mailDetail-sender">작성자: {mailData.sender}</span>
          </div>
        </div>

        {/* 첨부 파일 */}
        {mailData.file && mailData.file.length > 0 && (
          <div className="mailDetail-files">
            <span className="mailDetail-files-title">
              첨부파일 {mailData.file.length}개
            </span>
            <div className="mailDetail-files-list">
              {mailData.file.map((fileName, index) => (
                <FileItem key={index} file={fileName} />
              ))}
            </div>
          </div>
        )}
        {/* 메일 내용 */}
        <div className="mailDetail-content">{mailData.content}</div>
      </div>
      {/* 메일 시간 정보 */}
      <div className="mailDetail-footer">
        <span className="mailDetail-receiveAt">{mailData.receiveAt} 수신</span>
      </div>
    </div>
  );
};
export default MailDetail;
