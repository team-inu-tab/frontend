import "@components/mailBox/css/fileItem.css";

/**
 * FileItem - 첨부 파일 항목을 표시하는 컴포넌트
 * @param {string} props.file - 첨부 파일의 이름
 * @param {function} onClick - 클릭 시 동작할 함수 (예: 다운로드)
 * @returns {JSX.Element} 첨부 파일 UI 컴포넌트
 */
const FileItem = ({ fileName, onClick }) => {
  return (
    <div
      className="fileItem-wrapper"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="fileItem-header">
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
      <div className="fileItem-preview"></div>
    </div>
  );
};
export default FileItem;
