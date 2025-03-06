import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@routes/router.jsx";
import Signin from "@screens/signin.jsx";
import MailWriteModal from "@components/common/mailWriteModal.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
