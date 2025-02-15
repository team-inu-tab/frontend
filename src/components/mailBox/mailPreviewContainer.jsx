import "@components/mailBox/css/mailPreviewContainer.css";
import MailPreviewItem from "./mailPreviewItem";

/**
 * MailPreviewContainer - 메일 미리보기 목록을 감싸는 컨테이너 컴포넌트
 * @returns {JSX.Element} 메일 미리보기 리스트 UI
 */
const MailPreviewContainer = () => {
  return (
    <div className="mailPreviewContainer-wrapper">
      {/* 사용자가 보낸 메일 미리보기 */}
      <MailPreviewItem isSentByMe={true} />
      {/* 사용자가 받은 메일 미리보기 */}
      <MailPreviewItem isSentByMe={false} />
    </div>
  );
};
export default MailPreviewContainer;
