import "@components/mailBox/css/mailListItem.css";
import { useCheckboxStore, useMailStore } from "../../store";

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
  const toggleCheckbox = useCheckboxStore((state) => state.toggleCheckbox); // 메일 선택 관련 함수 가져오기
  const setSelectedMail = useMailStore((state) => state.setSelectedMail); // 현재 선택된 메일을 설정하는 함수

  /**
   * 특정 메일을 선택하여 상세 보기 화면으로 전환하는 함수
   * @param {Object} mail - 선택된 메일 객체
   */
  const handleSelectMail = (mail) => {
    setSelectedMail(mail); // 선택된 메일 업데이트
  };

  return (
    <div className="mailListItem-wrapper">
      {/* 메일 선택 체크박스 */}
      <input
        className="mailListItem-checkBox"
        type="checkbox"
        checked={mail.isChecked}
        onChange={(e) => toggleCheckbox(mail.id, e.target.checked)}
      />

      {/* 메일 정보 (클릭 시 상세 보기) */}
      <div
        className="mailListItem-mailInfo"
        onClick={() => handleSelectMail(mail)}
      >
        {/* 발신자 이름 */}
        <span className="mailListItem-sender">{mail.sender}</span>
        <div className="mailListItem-title-container">
          {/* 첨부 파일 존재 시 아이콘 표시 */}
          {mail.isFileExist && (
            <img
              className="mailListItem-attachment"
              src="/src/assets/icons/attachment.svg"
              alt="Attachment icon for email"
            />
          )}
          {/* 메일 제목 */}
          <span className="mailListItem-title">{mail.title}</span>
        </div>

        {/* 메일 수신 시간 */}
        <span className="mailListItem-receiveAt">{mail.receiveAt}</span>
      </div>
    </div>
  );
};

export default MailListItem;
