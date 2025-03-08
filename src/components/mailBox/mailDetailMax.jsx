import "@components/mailBox/css/mailDetailMax.css";
import { useMailStore } from "../../store";
import ExpandArrow from "@assets/icons/expandArrow.svg?react";

const MailDetailMax = () => {
  const selectedMail = useMailStore((state) => state.selectedMail); // 현재 선택된 메일 정보 가져오기
  const toggleExpanded = useMailStore((state) => state.toggleExpanded);

  // 선택된 메일이 없으면 화면에 표시하지 않음
  if (!selectedMail) {
    return null;
  }

  return (
    <div className="mailDetailMax-wrapper">
      <div className="mailDetailMax-container">
        {/* 메일 제목 및 발신자 정보 */}
        <div className="mailDetailMax-header">
          <div className="mailDetailMax-header-container">
            <span className="mailDetailMax-title">{selectedMail.title}</span>
            <span className="mailDetailMax-sender">
              작성자: {selectedMail.sender}
            </span>
          </div>
          {/* 확장 버튼 */}
          <ExpandArrow onClick={toggleExpanded} />
        </div>

        {/* 첨부 파일 (첨부된 파일이 있는 경우)
        {selectedMail.isFileExist && (
          <div className="mailDetailMax-files">
            <span className="mailDetailMax-files-title">
              첨부파일 {selectedMail.file.length}개
            </span>
            <div className="mailDetailMax-files-list">
              {selectedMail.file.map((fileName, index) => (
                <FileItem key={index} file={fileName} />
              ))}
            </div>
          </div>
        )} */}

        {/* 메일 본문 내용 */}
        <div className="mailDetailMax-content">{selectedMail.content}</div>
      </div>

      {/* 메일 수신 시간 정보 */}
      <div className="mailDetailMax-footer">
        <span className="mailDetailMax-receiveAt">
          {selectedMail.receiveAt} 수신
        </span>
      </div>
    </div>
  );
};
export default MailDetailMax;
