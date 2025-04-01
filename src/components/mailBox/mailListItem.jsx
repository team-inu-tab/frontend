import "@components/mailBox/css/mailListItem.css";
import { useCheckboxStore, useMailStore } from "../../store";
import Star from "@assets/icons/star.svg?react";
import { useFormattedDate } from "../../hooks/useFormattedDate";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

/**
 * MailListItem - 개별 메일 항목을 렌더링하는 컴포넌트
 * @param {Object} props.mail - 메일 정보 객체
 * @param {string} props.mail.id - 메일 ID
 * @param {string} props.mail.sender - 발신자
 * @param {string} props.mail.title - 메일 제목
 * @param {string} props.mail.receiveAt - 수신 시간
 * @param {boolean} props.mail.isChecked - 선택 여부
 * @param {boolean} props.mail.isFileExist - 첨부 파일 존재 여부
 * @returns {JSX.Element} 메일 리스트 항목 컴포넌트
 */
const MailListItem = ({ mail }) => {
  const location = useLocation();

  const toggleCheck = useCheckboxStore((state) => state.toggleCheck);
  const isChecked = useCheckboxStore((state) => state.isChecked);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail); // 현재 선택된 메일을 설정하는 함수

  const formatReceiveDate = useFormattedDate(); // 날짜 포맷 변경
  const isImportant = mail.isImportant; // 중요 메일 여부

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

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

  return (
    <div className="mailListItem-wrapper" onClick={() => setSelectedMail(mail)}>
      {/* 메일 선택 체크박스 */}
      <label className="mailListItem-custom-checkBox">
        <input
          type="checkbox"
          checked={isChecked(boxType, mail.id)}
          onChange={() => toggleCheck(boxType, mail.id)}
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
      {isMobile ? (
        <div className="mailListItem-mailInfo">
          <div className="mailListItem-mailInfo-m">
            {/* 발신자 이름 */}
            <span className="mailListItem-sender">
              {mail.sender ?? mail.receiver}
            </span>
            {/* 메일 수신 시간 */}
            <span className="mailListItem-receiveAt">
              {formatReceiveDate(
                mail.receiveAt ?? mail.sendAt ?? mail.createdAt
              )}
            </span>
          </div>
          <div className="mailListItem-title-container">
            {/* 첨부 파일 존재 시 아이콘 표시 */}
            {mail.fileNameList && (
              <img
                src="/src/assets/icons/attachment.svg"
                alt="Attachment icon for email"
              />
            )}
            {/* 메일 제목 */}
            <span className="mailListItem-title">{mail.title}</span>
          </div>
        </div>
      ) : (
        <div className="mailListItem-mailInfo">
          {/* 발신자 이름 */}
          <span className="mailListItem-sender">
            {mail.sender ?? mail.receiver}
          </span>
          <div className="mailListItem-title-container">
            {/* 첨부 파일 존재 시 아이콘 표시 */}
            {mail.fileNameList && (
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
      )}
    </div>
  );
};

export default MailListItem;
