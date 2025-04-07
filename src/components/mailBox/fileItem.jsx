import "@components/mailBox/css/fileItem.css";
import { useMailApi } from "../../hooks/useMailApi";
import { useEffect, useState } from "react";

/**
 * FileItem - 첨부 파일 항목을 표시하는 컴포넌트
 * @param {string} props.file - 첨부 파일의 이름
 * @param {function} onClick - 클릭 시 동작할 함수 (예: 다운로드)
 * @returns {JSX.Element} 첨부 파일 UI 컴포넌트
 */
const FileItem = ({ fileName, emailId, attachmentId, onClick, isPreview }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const { getFilePreviewUrl } = useMailApi();
  const extension = fileName.split(".").pop().toLowerCase();

  // 메일 미리보기 URL 가져오기
  useEffect(() => {
    const loadPreview = async () => {
      const url = await getFilePreviewUrl({
        emailId,
        attachmentId,
        fileName,
      });
      setPreviewUrl(url);
    };
    if (["jpg", "png", "jpeg"].includes(extension)) loadPreview();
  }, []);

  return (
    <div
      className={`fileItem-wrapper ${isPreview ? "preview" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={`fileItem-header ${isPreview ? "preview" : ""}`}>
        {/* 첨부 파일 아이콘 */}
        <img
          className="fileItem-icon"
          src="/src/assets/icons/attachment.svg"
          alt="Attachment icon for email"
        />
        {/* 첨부 파일 이름 */}
        <span className="fileItem-name">{fileName}</span>
      </div>

      {/* 파일 미리보기 */}
      <div className={`fileItem-preview ${isPreview ? "preview" : ""}`}>
        <iframe src={previewUrl} width="100%" height="100%" title="미리보기" />
      </div>
    </div>
  );
};
export default FileItem;
