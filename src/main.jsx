import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Signin from "@/screens/signin.jsx";
import Login from "@/screens/login.jsx";
import MailContainer from "@components/common/mailWriteContainer.jsx";
import MailWriteModal from './components/common/mailWriteModal.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MailWriteModal />
  </StrictMode>,
)
