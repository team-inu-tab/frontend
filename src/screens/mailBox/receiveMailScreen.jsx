import "@screens/mailBox/css/receiveMailScreen.css";
import MailDetail from "../../components/mailBox/mailDetail";
import MailListContainer from "../../components/mailBox/mailListContainer";

const ReceiveMailScreen = () => {
  return (
    <div className="receiveMailScreen-wrapper">
      <MailListContainer sortBy="time" />
      <MailDetail />
    </div>
  );
};

export default ReceiveMailScreen;
