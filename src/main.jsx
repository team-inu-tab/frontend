import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MailWriteModal from './components/common/mailWriteModal.jsx';
import WriteContainer from '@components/common/mailWritingContainer.jsx';
import Signin from '@screens/signin.jsx';
import Landing from '@screens/landingScreen.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
)
