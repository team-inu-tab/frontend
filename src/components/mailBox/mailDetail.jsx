import "@components/mailBox/css/mailDetail.css";
import FileItem from "./fileItem";
import { useContext } from "react";
import { MailContext } from "@contexts/MailContext";

const MailDetail = () => {
  const { selectedMail } = useContext(MailContext);

  if (!selectedMail) {
    return null;
  }

  return (
    <div className="mailDetail-wrapper">
      <div className="mailDetail-container">
        {/* 메일 제목 */}
        <div className="mailDetail-header">
          <div className="mailDetail-header-container">
            <span className="mailDetail-title">{selectedMail.title}</span>
            <span className="mailDetail-sender">
              작성자: {selectedMail.sender}
            </span>
          </div>
          <img
            className="mailDetail-arrow"
            src="/src/assets/icons/expandArrow.svg"
            alt="Expand Arrow"
          />
        </div>

        {/* 첨부 파일 */}
        {selectedMail.isFileExist && selectedMail.file.length > 0 && (
          <div className="mailDetail-files">
            <span className="mailDetail-files-title">
              첨부파일 {selectedMail.file.length}개
            </span>
            <div className="mailDetail-files-list">
              {selectedMail.file.map((fileName, index) => (
                <FileItem key={index} file={fileName} />
              ))}
            </div>
          </div>
        )}
        {/* 메일 내용 */}
        <div className="mailDetail-content">{selectedMail.content}</div>
      </div>
      {/* 메일 시간 정보 */}
      <div className="mailDetail-footer">
        <span className="mailDetail-receiveAt">
          {selectedMail.receiveAt} 수신
        </span>
      </div>
    </div>
  );
};
export default MailDetail;
