import GoogleLogIn from "../../components/common/googleLoginButton";
import TimeSortedList from "../../components/mailBox/timeSortedList";

const SpamMailScreen = () => {
  return (
    <div>
      <TimeSortedList />
      <GoogleLogIn />
    </div>
  );
};

export default SpamMailScreen;
