import "@components/menu/css/menuBar.css";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";
import { useState } from "react";

/**
 * @returns {JSX.Element} 메뉴바 UI
 */
const MenuBar = () => {
  const [isMenubarOpen, setIsMenubarOpen] = useState(false);

  // 메뉴바 상태 토글 함수
  const toggleMenubar = () => setIsMenubarOpen((prev) => !prev);

  return (
    <div className={`menuBar-wrapper ${isMenubarOpen ? "" : "menuBar-close"}`}>
      {/* 메뉴바 헤더 */}
      <div className={`menuBar-header ${isMenubarOpen ? "" : "menuBar-close"}`}>
        {/* 로고 이미지 */}
        <img
          className="menuBar-logo"
          src="/src/assets/images/symbolLogo.svg"
          alt="Symbol Logo"
        />
        {/* 메뉴바 열림/닫힘 화살표 */}
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
        <MenuItem title="home" isMenubarOpen={isMenubarOpen} />
        <SubMenu isMenubarOpen={isMenubarOpen} />
        <MenuItem title="notification" isMenubarOpen={isMenubarOpen} />
        <MenuItem title="profile" isMenubarOpen={isMenubarOpen} />
        <MenuItem title="settings" isMenubarOpen={isMenubarOpen} />
      </div>
    </div>
  );
};

export default MenuBar;
