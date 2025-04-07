import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@screens/RootLayout";
import MailBoxLayout from "@components/mailBox/mailBoxLayout.jsx";
import Landing from "@screens/landingScreen.jsx";
import Signin from "@screens/signin.jsx";
import ReceiveMailScreen from "@screens/mailBox/receiveMailScreen.jsx";
import DeletedMailScreen from "@screens/mailBox/deletedMailScreen.jsx";
import DraftMailScreen from "@screens/mailBox/draftMailScreen.jsx";
import ImportantMailScreen from "@screens/mailBox/importantMailScreen.jsx";
import ScheduledMailScreen from "@screens/mailBox/scheduledMailScreen.jsx";
import SelfSentMailScreen from "@screens/mailBox/selfSentMailScreen.jsx";
import SentMailScreen from "@screens/mailBox/sentMailScreen.jsx";
import SpamMailScreen from "@screens/mailBox/spamMailScreen.jsx";
import LoginTest from "@screens/loginTest.jsx";
import SettingScreen from "@screens/settingScreen";
import ProfileScreen from "@screens/profileScreen";
import NotificationScreen from "@screens/notificationScreen";
import SearchMailScreen from "@screens/mailBox/SearchMailScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/addInfo",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signin />,
  },
  {
    path: "/test",
    element: <LoginTest />,
  },

  {
    element: <RootLayout />, // MenuBar 포함된 레이아웃
    children: [
      {
        path: "/mail",
        element: <MailBoxLayout />,
        children: [
          { path: "receive", element: <ReceiveMailScreen /> },
          { path: "deleted", element: <DeletedMailScreen /> },
          { path: "draft", element: <DraftMailScreen /> },
          { path: "important", element: <ImportantMailScreen /> },
          { path: "scheduled", element: <ScheduledMailScreen /> },
          { path: "selfsent", element: <SelfSentMailScreen /> },
          { path: "sent", element: <SentMailScreen /> },
          { path: "spam", element: <SpamMailScreen /> },
          { path: "search", element: <SearchMailScreen /> },
        ],
      },
      {
        path: "/notification",
        element: <NotificationScreen />,
      },
      {
        path: "/setting",
        element: <SettingScreen />,
      },
      {
        path: "/profile",
        element: <ProfileScreen />,
      },
    ],
  },
]);

export default router;
