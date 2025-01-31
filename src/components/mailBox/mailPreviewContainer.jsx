import "@components/mailBox/css/mailPreviewContainer.css";
import MailPreviewItem from "./mailPreviewItem";

const MailPreviewContainer = () => {
  return (
    <div className="mailPreviewContainer-wrapper">
      <MailPreviewItem isSentByMe={true} />
      <MailPreviewItem isSentByMe={false} />
    </div>
  );
};
export default MailPreviewContainer;
