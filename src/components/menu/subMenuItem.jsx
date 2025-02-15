import "../menu/css/subMenuItem.css";

/**
 * SubMenuItem - 서브 메뉴의 개별 항목을 렌더링하는 컴포넌트
 * @param {"receiveMail" | "sentMail"| "selfSentMail"| "importantMail"| "scheduledMail" | "draftMail"| "spamMail"| "deletedMail"} props.title - 서브 메뉴의 타입
 * @param {boolean} props.isMenubarOpen - 메뉴바가 열려 있는지 여부
 * @returns {JSX.Element} 서브 메뉴 항목
 */
const SubMenuItem = ({ title, isMenubarOpen }) => {
  let titleName = "";

  /**
   * title 값에 따라 한글 텍스트와 아이콘 색상을 반환하는 함수
   * @param {string} title - 메일함 유형
   * @returns {string} 아이콘 색상 코드 (HEX)
   */
  const getFillColor = (title) => {
    switch (title) {
      case "receiveMail":
        titleName = "받은 메일함";
        return "#A87CF6";
      case "sentMail":
        titleName = "보낸 메일함";
        return "#7469F7";
      case "selfSentMail":
        titleName = "내게쓴 메일함";
        return "#FF57F1";
      case "importantMail":
        titleName = "중요 메일함";
        return "#38FDE6";
      case "scheduledMail":
        titleName = "예약 메일함";
        return "#A87CF6";
      case "draftMail":
        titleName = "임시 보관함";
        return "#7469F7";
      case "spamMail":
        titleName = "스팸 메일함";
        return "#FF57F1";
      case "deletedMail":
        titleName = "휴지통";
        return "#38FDE6";
      default:
        return "#CCCCCC";
    }
  };

  return (
    <div
      className={`subMenuItem-wrapper ${
        isMenubarOpen ? "" : "subMenuItem-close"
      }`}
    >
      {/* 서브 메뉴 아이콘 */}
      <svg
        className="subMenuItem-ellipse"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 6 6"
        width="6"
        height="6"
      >
        <circle cx="3" cy="3" r="3" fill={getFillColor(title)} />
      </svg>
      {/* 서브 메뉴 텍스트 */}
      <span
        className={`subMenuItem-text ${
          isMenubarOpen ? "" : "subMenuItem-close"
        }`}
      >
        {titleName}
      </span>
    </div>
  );
};

export default SubMenuItem;
