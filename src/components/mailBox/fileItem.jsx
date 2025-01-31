import "@components/mailBox/css/fileItem.css";

const FileItem = ({ file }) => {
  return (
    <div className="fileItem-wrapper">
      <div className="fileItem-header">
        <img
          className="fileItem-icon"
          src="/src/assets/icons/attachment.svg"
          alt="Attachment icon for email"
        />
        <span className="fileItem-name">{file}</span>
      </div>
      <div className="fileItem-preview"></div>
    </div>
  );
};
export default FileItem;
