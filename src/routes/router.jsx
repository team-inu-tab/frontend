import { createBrowserRouter } from "react-router-dom";
import MailBoxLayout from "../components/mailBox/mailBoxLayout";
import Landing from "../screens/landingScreen";
import Signin from "../screens/signin";
import Login from "../screens/login";
import ReceiveMailScreen from "../screens/mailBox/receiveMailScreen";
import DeletedMailScreen from "../screens/mailBox/deletedMailScreen";
import DraftMailScreen from "../screens/mailBox/draftMailScreen";
import ImportantMailScreen from "../screens/mailBox/importantMailScreen";
import ScheduledMailScreen from "../screens/mailBox/scheduledMailScreen";
import SelfSentMailScreen from "../screens/mailBox/selfSentMailScreen";
import SentMailScreen from "../screens/mailBox/sentMailScreen";
import SpamMailScreen from "../screens/mailBox/spamMailScreen";

const router = createBrowserRouter([
  {
    path: "/mail",
    element: <MailBoxLayout />,
    children: [
      { index: true, element: <ReceiveMailScreen /> },
      { path: "receive", element: <ReceiveMailScreen /> },
      { path: "deleted", element: <DeletedMailScreen /> },
      { path: "draft", element: <DraftMailScreen /> },
      { path: "important", element: <ImportantMailScreen /> },
      { path: "scheduled", element: <ScheduledMailScreen /> },
      { path: "selfsent", element: <SelfSentMailScreen /> },
      { path: "sent", element: <SentMailScreen /> },
      { path: "spam", element: <SpamMailScreen /> },
    ],
  },
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signup",
    element: <Signin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default router;
