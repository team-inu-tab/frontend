import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@routes/router.jsx";
import MailWriteModal from "@components/common/mailWriteModal.jsx";
import Signin from "@screens/signin.jsx";
import Landing from "@screens/landingScreen.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <MailWriteModal></MailWriteModal> */}
    {/* <TextEditor></TextEditor> */}
    {/* <Signin></Signin> */}
    {/* <AddInfoComp></AddInfoComp> */}
    {/* <MailWriteModal/> */}
    {/* <Landing/> */}
  </StrictMode>
);
