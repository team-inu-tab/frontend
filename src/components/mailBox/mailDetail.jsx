import "@components/mailBox/css/mailDetail.css";
import { useMailStore } from "../../store";
import ExpandArrow from "@assets/icons/expandArrow.svg?react";
import { useMailApi } from "@/hooks/useMailApi";
import { useFormattedDate } from "../../hooks/useFormattedDate";
import FileItem from "./fileItem";

/**
 * MailDetail - 선택된 메일의 상세 내용을 표시하는 컴포넌트
 * @returns {JSX.Element | null} 메일 상세 정보 UI (선택된 메일이 없으면 null 반환)
 */
const MailDetail = () => {
  const selectedMail = useMailStore((state) => state.selectedMail); // 현재 선택된 메일 가져오기
  const toggleExpanded = useMailStore((state) => state.toggleExpanded);

  const formatReceiveDate = useFormattedDate();

  const { getFile } = useMailApi();

  // 선택된 메일이 없으면 화면에 표시하지 않음
  if (!selectedMail) {
    return <div>No mail selected</div>;
  }

  return (
    <div className="mailDetail-wrapper">
      <div className="mailDetail-container">
        {/* 메일 제목 및 발신자 정보 */}
        <div className="mailDetail-header">
          <div className="mailDetail-header-container">
            <span className="mailDetail-title">{selectedMail.title}</span>
            <span className="mailDetail-sender">
              보낸사람: {selectedMail.sender}
            </span>
            <span className="mailDetail-sender">
              받는사람: {selectedMail.receiver}
            </span>
          </div>
          {/* 확장 버튼 */}
          <ExpandArrow onClick={toggleExpanded} />
        </div>

        {/* 첨부 파일 */}
        {selectedMail.fileNameList.length > 0 && (
          <div className="mailDetail-files">
            <span className="mailDetail-files-title">
              첨부파일 {selectedMail.fileNameList.length}개
            </span>
            <div className="mailDetail-files-list">
              {selectedMail.fileNameList.map((file) => (
                <FileItem
                  key={file.attachmentId}
                  fileName={file.fileName}
                  onClick={() =>
                    getFile({
                      emailId: selectedMail.id,
                      attachmentId: file.attachmentId,
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* 메일 본문 내용 */}
        <div className="mailDetail-content">{selectedMail.content}</div>
      </div>

      {/* 메일 수신 시간 정보 */}
      <div className="mailDetail-footer">
        <span className="mailDetail-receiveAt">
          {formatReceiveDate(selectedMail.receiveAt ?? selectedMail.sendAt)}
        </span>
      </div>
    </div>
  );
};
export default MailDetail;
