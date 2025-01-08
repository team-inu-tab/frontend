import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from "@/screens/login.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
