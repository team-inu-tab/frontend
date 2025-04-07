import "@components/mailBox/css/mailListItem.css";
import { useCheckboxStore, useMailStore } from "../../store";
import Star from "@assets/icons/star.svg?react";
import { useLocation } from "react-router-dom";
import { extractSenderName, formatReceiveDate } from "../../utils/emailUtils";
import { useMailApi } from "../../hooks/useMailApi";
import { useEffect, useState } from "react";
import { parseGmailContent } from "../../utils/parseGmailContent";

/**
 * MailListItem - 개별 메일 항목을 렌더링하는 컴포넌트
 * @returns {JSX.Element} 메일 리스트 항목 컴포넌트
 */
const MailListItem = ({ mail }) => {
  const [decodedBody, setDecodedBody] = useState("");

  const location = useLocation();

  const toggleCheck = useCheckboxStore((state) => state.toggleCheck);
  const isChecked = useCheckboxStore((state) => state.isChecked);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail); // 현재 선택된 메일을 설정하는 함수

  const { updateDraftMail } = useMailApi();

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

  // content 파싱 및 이미지 포함 본문, 첨부파일 렌더링
  useEffect(() => {
    const load = async () => {
      if (mail?.content) {
        const { html } = await parseGmailContent(mail.content, mail.id);
        setDecodedBody(html);
      }
    };

    if (mail.draftId) load();
  }, [mail]);

  // 임시 메일 수정
  const handleUpdateDraft = async () => {
    try {
      await updateDraftMail(
        mail.draftId,
        mail.receiver,
        mail.title,
        decodedBody
      );
    } catch {
      alert("수정 실패");
    }
  };

  // 메일 클릭 함수
  const handleMailClick = () => {
    if (mail.draftId) handleUpdateDraft();
    else setSelectedMail(mail);
  };

  return (
    <div className="mailListItem-wrapper" onClick={handleMailClick}>
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
      <div className="mailListItem-mailInfo">
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
