import "@components/mailBox/css/mailDetailMax.css";
import { useMailStore } from "../../store";
import ExpandArrow from "@assets/icons/expandArrow.svg?react";
import { useFormattedDate } from "../../hooks/useFormattedDate";
import { useMailApi } from "@/hooks/useMailApi";
import FileItem from "./fileItem";

const MailDetailMax = () => {
  const selectedMail = useMailStore((state) => state.selectedMail); // 현재 선택된 메일 가져오기
  const toggleExpanded = useMailStore((state) => state.toggleExpanded);

  const formatReceiveDate = useFormattedDate();

  const { getFile } = useMailApi();

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
            {selectedMail.sender && (
              <span className="mailDetail-sender">
                보낸사람: {selectedMail.sender}
              </span>
            )}
            {selectedMail.receiver && (
              <span className="mailDetail-sender">
                받는사람: {selectedMail.receiver}
              </span>
            )}
          </div>
          {/* 확장 버튼 */}
          <ExpandArrow className="expandArrow-icon" onClick={toggleExpanded} />
        </div>

        {/* 첨부 파일 */}
        {selectedMail?.fileNameList?.length > 0 && (
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
                      fileName: file.fileName,
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* 메일 본문 내용 */}
        <div className="mailDetailMax-content">{selectedMail.content}</div>
      </div>

      {/* 메일 수신 시간 정보 */}
      <div className="mailDetailMax-footer">
        <span className="mailDetailMax-receiveAt">
          {formatReceiveDate(selectedMail.receiveAt ?? selectedMail.sendAt)}
        </span>
      </div>
    </div>
  );
};
export default MailDetailMax;
