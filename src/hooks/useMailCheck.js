import { useContext } from "react";
import { MailContext } from "@contexts/MailContext";

const useMailCheck = () => {
  const { mails, setMails } = useContext(MailContext);

  // 선택된 메일 항목 수 반환
  const selectedCount = mails.filter((mail) => mail.isChecked).length;

  // 메일 전체 선택/해제
  const selectAll = (isChecked) => {
    setMails((prevMails) =>
      prevMails.map((mail) => ({
        ...mail,
        isChecked: isChecked,
      }))
    );
  };

  // 개별 메일 선택/해제
  const toggleCheckbox = (id, isChecked) => {
    setMails((prevMails) =>
      prevMails.map((mail) =>
        mail.id === id ? { ...mail, isChecked: isChecked } : mail
      )
    );
  };

  return { selectedCount, selectAll, toggleCheckbox };
};

export default useMailCheck;
