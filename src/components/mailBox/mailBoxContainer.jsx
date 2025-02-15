import "@components/mailBox/css/mailBoxContainer.css";
import MailListHeader from "./mailListHeader";
import MailDetail from "./mailDetail";
import MailListContainer from "./mailListContainer";

const MailBoxContainer = () => {
  return (
    <div className="mailBoxContainer-wrapper">
      <MailListHeader />
      <div className="mailBoxContainer-container">
        <MailListContainer sortBy="time" />
        <MailDetail />
      </div>
    </div>
  );
};
export default MailBoxContainer;
