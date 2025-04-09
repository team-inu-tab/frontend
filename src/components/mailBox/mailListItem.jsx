import "@components/mailBox/css/mailListItem.css";
import { useCheckboxStore, useMailStore } from "../../store";
import Star from "@assets/icons/star.svg?react";
import { useLocation, useNavigate } from "react-router-dom";
import { extractSenderName, formatReceiveDate } from "../../utils/emailUtils";
import { useEffect, useState } from "react";

/**
 * MailListItem - 개별 메일 항목을 렌더링하는 컴포넌트
 * @returns {JSX.Element} 메일 리스트 항목 컴포넌트
 */
const MailListItem = ({ mail }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [localChecked, setLocalChecked] = useState(false);

  const toggleCheck = useCheckboxStore((state) => state.toggleCheck);
  const isChecked = useCheckboxStore((state) => state.isChecked);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);

  const isImportant = mail.isImportant; // 중요 메일 여부

  let boxType = "";

  /**
   * 현재 위치에 따라 헤더 내용 동적으로 변경
   */
  switch (true) {
    case location.pathname.includes("/receive"):
      boxType = "receive";
      break;
    case location.pathname.includes("/important"):
      boxType = "important";
      break;
    case location.pathname.includes("/deleted"):
      boxType = "deleted";
      break;
    case location.pathname.includes("/draft"):
      boxType = "draft";
      break;
    case location.pathname.includes("/scheduled"):
      boxType = "scheduled";
      break;
    case location.pathname.includes("/selfsent"):
      boxType = "selfsent";
      break;
    case location.pathname.includes("/sent"):
      boxType = "sent";
      break;
    case location.pathname.includes("/spam"):
      boxType = "spam";
      break;
    default:
  }

  // 체크박스 상태 동기화
  useEffect(() => {
    setLocalChecked(isChecked(boxType, mail.id));
  }, [isChecked(boxType, mail.id), boxType, mail.id]);

  // 메일 클릭 함수
  const handleMailClick = () => {
    if (mail.draftId) {
      navigate(`/mail/compose/${mail.draftId}`);
    } else {
      setSelectedMail(mail);
    }
  };

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    const newChecked = !localChecked;
    setLocalChecked(newChecked);
    toggleCheck(boxType, mail.id);
  };

  return (
    <div className="mailListItem-wrapper">
      {/* 메일 선택 체크박스 */}
      <label className="mailListItem-custom-checkBox">
        <input
          type="checkbox"
          checked={localChecked}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
        />
        <span className="checkmark"></span>
      </label>

      {/* 중요 메일 표시 */}
      <div className="mailListItem-star-container">
        <Star
          className={`mailListItem-star ${isImportant ? "important" : ""}`}
        />
      </div>

      {/* 메일 정보 (클릭 시 상세 보기) */}
      <div className="mailListItem-mailInfo" onClick={handleMailClick}>
        {/* 발신자 이름 */}
        <span className="mailListItem-sender">
          {extractSenderName(mail.sender) ?? extractSenderName(mail.receiver)}
        </span>
        <div className="mailListItem-title-container">
          {/* 첨부 파일 존재 시 아이콘 표시 */}
          {mail.fileNameList && mail.fileNameList.length > 0 && (
            <img
              src="/src/assets/icons/attachment.svg"
              alt="Attachment icon for email"
            />
          )}
          {/* 메일 제목 */}
          <span className="mailListItem-title">{mail.title}</span>
        </div>

        {/* 메일 수신 시간 */}
        <span className="mailListItem-receiveAt">
          {formatReceiveDate(mail.receiveAt ?? mail.sendAt ?? mail.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default MailListItem;
