import "@components/menu/css/menuBar.css";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";
import { useState } from "react";

const MenuBar = () => {
  const [isMenubarOpen, setIsMenubarOpen] = useState(false);

  const toggleMenubar = () => setIsMenubarOpen((prev) => !prev);

  return (
    <div className={`menuBar-wrapper ${isMenubarOpen ? "" : "menuBar-close"}`}>
      <div className={`menuBar-header ${isMenubarOpen ? "" : "menuBar-close"}`}>
        <img
          className="menuBar-logo"
          src="/src/assets/images/symbolLogo.svg"
          alt="Symbol Logo"
        />
        <img
          className={`menuBar-arrow ${isMenubarOpen ? "" : "menuBar-close"}`}
          src="/src/assets/icons/arrow.svg"
          alt="Arrow Icon"
          onClick={toggleMenubar}
        />
      </div>
      <span className={`menuBar-text ${isMenubarOpen ? "" : "menuBar-close"}`}>
        메뉴
      </span>
      <div
        className={`menuBar-menuContainer ${
          isMenubarOpen ? "" : "menuBar-close"
        }`}
      >
        <MenuItem title="홈" isMenubarOpen={isMenubarOpen} />
        <SubMenu isMenubarOpen={isMenubarOpen} />
        <MenuItem title="알림" isMenubarOpen={isMenubarOpen} />
        <MenuItem title="프로필" isMenubarOpen={isMenubarOpen} />
        <MenuItem title="설정" isMenubarOpen={isMenubarOpen} />
      </div>
    </div>
  );
};

export default MenuBar;
