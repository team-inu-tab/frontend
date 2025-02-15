import "@components/mailBox/css/fileItem.css";

/**
 * FileItem - 첨부 파일 항목을 표시하는 컴포넌트
 * @param {string} props.file - 첨부 파일의 이름
 * @returns {JSX.Element} 첨부 파일 UI 컴포넌트
 */
const FileItem = ({ file }) => {
  return (
    <div className="fileItem-wrapper">
      <div className="fileItem-header">
        {/* 첨부 파일 아이콘 */}
        <img
          className="fileItem-icon"
          src="/src/assets/icons/attachment.svg"
          alt="Attachment icon for email"
        />
        {/* 첨부 파일 이름 */}
        <span className="fileItem-name">{file}</span>
      </div>

      {/* 파일 미리보기 */}
      <div className="fileItem-preview"></div>
    </div>
  );
};
export default FileItem;
