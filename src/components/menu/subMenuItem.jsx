import "../menu/css/subMenuItem.css";

const SubMenuItem = ({ title, isMenubarOpen }) => {
  const getFillColor = (title) => {
    switch (title) {
      case "보낸 메일함":
        return "#A87CF6";
      case "내게 쓴 메일함":
        return "#7469F7";
      case "받은 메일함":
        return "#FF57F1";
      case "예약 메일함":
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
      <svg
        className="subMenuItem-ellipse"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 6 6"
        width="6"
        height="6"
      >
        <circle cx="3" cy="3" r="3" fill={getFillColor(title)} />
      </svg>
      <span
        className={`subMenuItem-text ${
          isMenubarOpen ? "" : "subMenuItem-close"
        }`}
      >
        {title}
      </span>
    </div>
  );
};

export default SubMenuItem;
