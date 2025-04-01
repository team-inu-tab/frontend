import "@components/mailBox/css/mailDetail.css";
import { useMailStore } from "../../store";
import ExpandArrow from "@assets/icons/expandArrow.svg?react";
import { useMailApi } from "@/hooks/useMailApi";
import { useFormattedDate } from "../../hooks/useFormattedDate";
import FileItem from "./fileItem";
import { useEffect, useState } from "react";

/**
 * MailDetail - 선택된 메일의 상세 내용을 표시하는 컴포넌트
 * @returns {JSX.Element | null} 메일 상세 정보 UI (선택된 메일이 없으면 null 반환)
 */
const MailDetail = () => {
  const selectedMail = useMailStore((state) => state.selectedMail); // 현재 선택된 메일 가져오기
  const toggleExpanded = useMailStore((state) => state.toggleExpanded);
  const formatReceiveDate = useFormattedDate();
  const { getFile } = useMailApi();

  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      if (!selectedMail) return;

      const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
      const imageFiles = selectedMail.fileNameList.filter((file) => {
        const ext = file.fileName.split(".").pop().toLowerCase();
        return imageExtensions.includes(ext);
      });

      const previews = await Promise.all(
        imageFiles.map(async (file) => {
          try {
            const res = await fetch(
              `/api/mails/${selectedMail.id}/file/${file.attachmentId}`
            );
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            return { url, fileName: file.fileName };
          } catch (err) {
            console.error("이미지 미리보기 실패:", file.fileName, err);
            return null;
          }
        })
      );

      setImagePreviews(previews.filter(Boolean)); // null 제거
    };

    loadImages();

    // cleanup: blob URL 해제
    return () => {
      imagePreviews.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [selectedMail]);

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
                      fileName: file.fileName,
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* 메일 본문 내용 */}
        <div className="mailDetail-content">{selectedMail.content}</div>

        {/* 이미지 미리보기 */}
        {imagePreviews.length > 0 && (
          <div>
            <div>
              {imagePreviews.map((img) => (
                <img
                  key={img.fileName}
                  src={img.url}
                  alt={img.fileName}
                  style={{ maxWidth: "100%", marginBottom: "1rem" }}
                />
              ))}
            </div>
          </div>
        )}
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
