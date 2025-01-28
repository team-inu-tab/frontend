import { createContext, useState } from "react";

export const MailContext = createContext();

export const MailProvider = ({ children }) => {
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null); // 선택된 메일 정보

  return (
    <MailContext.Provider
      value={{ mails, setMails, selectedMail, setSelectedMail }}
    >
      {children}
    </MailContext.Provider>
  );
};
