import "@components/mailBox/css/mailDetail.css";
import { useMailStore } from "../../store";

/**
 * MailDetail - 선택된 메일의 상세 내용을 표시하는 컴포넌트
 * @returns {JSX.Element | null} 메일 상세 정보 UI (선택된 메일이 없으면 null 반환)
 */
const MailDetail = () => {
  const selectedMail = useMailStore((state) => state.selectedMail); // 현재 선택된 메일 정보 가져오기

  // 선택된 메일이 없으면 화면에 표시하지 않음
  if (!selectedMail) {
    return null;
  }

  return (
    <div className="mailDetail-wrapper">
      <div className="mailDetail-container">
        {/* 메일 제목 및 발신자 정보 */}
        <div className="mailDetail-header">
          <div className="mailDetail-header-container">
            <span className="mailDetail-title">{selectedMail.title}</span>
            <span className="mailDetail-sender">
              작성자: {selectedMail.sender}
            </span>
          </div>
          {/* 확장 버튼 */}
          <img
            className="mailDetail-arrow"
            src="/src/assets/icons/expandArrow.svg"
            alt="Expand Arrow"
          />
        </div>

        {/* 첨부 파일 (첨부된 파일이 있는 경우)
        {selectedMail.isFileExist && (
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
        )} */}

        {/* 메일 본문 내용 */}
        <div className="mailDetail-content">{selectedMail.content}</div>
      </div>

      {/* 메일 수신 시간 정보 */}
      <div className="mailDetail-footer">
        <span className="mailDetail-receiveAt">
          {selectedMail.receiveAt} 수신
        </span>
      </div>
    </div>
  );
};
export default MailDetail;
