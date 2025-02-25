import "../menu/css/menuItem.css";

/**
 * MenuItem - 개별 메뉴 아이템 컴포넌트
 * @param {"home" | "notification" | "profile" | "settings"} props.title - 메뉴 제목
 * @param {boolean} props.isMenuBarOpen - 메뉴바가 열려 있는지 여부
 * @returns {JSX.Element} 개별 메뉴 컴포넌트
 */
const MenuItem = ({ title, isMenuBarOpen }) => {
  let icon = "";
  let titleName = "";

  /**
   * title 값에 따라 아이콘 이미지 경로 및 한글 메뉴명을 설정
   */
  switch (title) {
    case "home":
      icon = "/src/assets/icons/home.svg";
      titleName = "홈";
      break;
    case "notification":
      icon = "/src/assets/icons/notification.svg";
      titleName = "알림";
      break;
    case "profile":
      icon = "/src/assets/icons/profile.svg";
      titleName = "프로필";
      break;
    case "settings":
      icon = "/src/assets/icons/settings.svg";
      titleName = "설정";
      break;
    default:
      break;
  }

  return (
    <div
      className={`menuItem-wrapper ${isMenuBarOpen ? "" : "menuItem-close"}`}
    >
      {/* 마우스 hover 시 나타나는 왼쪽 바 (선택된 메뉴 강조 효과) */}
      <div
        className={`menuItem-leftBar ${isMenuBarOpen ? "" : "menuItem-close"}`}
      />

      {/* 메뉴 아이콘과 텍스트 */}
      <div
        className={`menuItem-container ${
          isMenuBarOpen ? "" : "menuItem-close"
        }`}
      >
        <img
          className={`menuItem-icon ${isMenuBarOpen ? "" : "menuItem-close"}`}
          src={icon}
        />
        <span
          className={`menuItem-text ${isMenuBarOpen ? "" : "menuItem-close"}`}
        >
          {titleName}
        </span>
      </div>

      {/* (메뉴바가 닫혀 있을 때) 마우스 hover 시 나타나는 텍스트 칩 */}
      <div
        className={`menuItem-shadowBox ${
          isMenuBarOpen ? "" : "menuItem-close"
        }`}
      >
        <span className="menuItem-text">{titleName}</span>
      </div>
    </div>
  );
};

export default MenuItem;
