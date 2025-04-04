import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@routes/router.jsx";
import MailWriteModal from "@components/common/mailWriteModal.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <MailWriteModal></MailWriteModal> */}
    {/* <TextEditor></TextEditor> */}
    {/* <Signin></Signin> */}
    {/* <AddInfoComp></AddInfoComp> */}
    {/* <MailWriteModal/> */}
  </StrictMode>
);
