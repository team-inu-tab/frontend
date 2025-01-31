import "@screens/mailBox/css/receiveMailScreen.css";
import MailDetail from "@components/mailBox/mailDetail";
import MailListContainer from "@components/mailBox/mailListContainer";
import MailListHeader from "@components/mailBox/mailListHeader";

const ReceiveMailScreen = () => {
  return (
    <div className="receiveMailScreen-wrapper">
      <MailListHeader />
      <MailListContainer sortBy="time" />
      <MailDetail />
    </div>
  );
};

export default ReceiveMailScreen;
