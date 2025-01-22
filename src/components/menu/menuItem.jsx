import "../menu/css/menuItem.css";

/**
 * @param {"home" | "notification" | "profile" | "settings"} props.title - 메뉴 제목
 * @param {boolean} props.isMenubarOpen - 메뉴바가 열려 있는지 여부
 * @returns {JSX.Element} 개별 메뉴 컴포넌트
 */
const MenuItem = ({ title, isMenubarOpen }) => {
  let icon = "";
  let titleName = "";

  // title 값에 따라 아이콘 경로와 한글 텍스트를 설정
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
      className={`menuItem-wrapper ${isMenubarOpen ? "" : "menuItem-close"}`}
    >
      {/* 마우스 hover 시 나타나는 왼쪽 바 */}
      <div
        className={`menuItem-leftBar ${isMenubarOpen ? "" : "menuItem-close"}`}
      />

      {/* 메뉴 아이콘과 텍스트 */}
      <div
        className={`menuItem-container ${
          isMenubarOpen ? "" : "menuItem-close"
        }`}
      >
        <img
          className={`menuItem-icon ${isMenubarOpen ? "" : "menuItem-close"}`}
          src={icon}
        />
        <span
          className={`menuItem-text ${isMenubarOpen ? "" : "menuItem-close"}`}
        >
          {titleName}
        </span>
      </div>

      {/* 마우스 hover 시 나타나는 텍스트 칩 */}
      <div
        className={`menuItem-shadowBox ${
          isMenubarOpen ? "" : "menuItem-close"
        }`}
      >
        <span className="menuItem-text">{titleName}</span>
      </div>
    </div>
  );
};

export default MenuItem;
