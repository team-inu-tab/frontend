import "../menu/css/menuItem.css";

const MenuItem = ({ title, isMenubarOpen }) => {
  let icon = "";

  switch (title) {
    case "홈":
      icon = "/src/assets/icons/home.svg";
      break;
    case "알림":
      icon = "/src/assets/icons/notification.svg";
      break;
    case "프로필":
      icon = "/src/assets/icons/profile.svg";
      break;
    case "설정":
      icon = "/src/assets/icons/settings.svg";
      break;
    default:
      break;
  }

  return (
    <div
      className={`menuItem-wrapper ${isMenubarOpen ? "" : "menuItem-close"}`}
    >
      <div
        className={`menuItem-leftBar ${isMenubarOpen ? "" : "menuItem-close"}`}
      />
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
          {title}
        </span>
      </div>
      <div
        className={`menuItem-shadowBox ${
          isMenubarOpen ? "" : "menuItem-close"
        }`}
      >
        <span className="menuItem-text">{title}</span>
      </div>
    </div>
  );
};

export default MenuItem;
