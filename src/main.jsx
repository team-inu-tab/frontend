import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@routes/router.jsx";
import mailListItem from "@components/mailBox/mailListItem.jsx";
import TextEditor from "@components/common/textEditor.jsx";
import MailWriteModal from "@components/common/mailWriteModal.jsx"
import Signin from "@screens/signin.jsx";
import AddInfoComp from "@screens/addInfoComp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <MailWriteModal></MailWriteModal> */}
    {/* <TextEditor></TextEditor> */}
    {/* <Signin></Signin> */}
    {/* <AddInfoComp></AddInfoComp> */}

  </StrictMode>
);
// test1