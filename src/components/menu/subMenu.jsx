import SubMenuItem from "./SubMenuItem";
import { useState } from "react";
import "../menu/css/subMenu.css";

/**
 * @param {boolean} props.isMenubarOpen - 메뉴바가 열려 있는지 여부
 * @returns {JSX.Element} 서브 메뉴 컴포넌트
 */
const SubMenu = ({ isMenubarOpen }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // 메일함
  const mailBox = [
    "receiveMail",
    "sentMail",
    "selfSentMail",
    "importantMail",
    "scheduledMail",
    "draftMail",
    "spamMail",
    "deletedMail",
  ];

  // 서브 메뉴 상태 토글 함수
  const toggleSubMenu = () => setIsSubMenuOpen((prev) => !prev);

  return (
    <div className={`subMenu-wrapper ${isMenubarOpen ? "" : "subMenu-close"}`}>
      {/* 마우스 hover 시 나타나는 왼쪽 바 */}
      <div
        className={`subMenu-leftBar ${isMenubarOpen ? "" : "subMenu-close"}`}
      />

      {/* 서브 메뉴 제목과 아이콘 */}
      <div
        className={`subMenu-container ${isMenubarOpen ? "" : "subMenu-close"}`}
        onClick={toggleSubMenu}
      >
        <div
          className={`subMenu-textContainer ${
            isMenubarOpen ? "" : "subMenu-close"
          }`}
        >
          <img
            className={`subMenu-icon ${isMenubarOpen ? "" : "subMenu-close"}`}
            src="/src/assets/icons/mailbox.svg"
          />
          <span
            className={`subMenu-text ${isMenubarOpen ? "" : "subMenu-close"}`}
          >
            메일함
          </span>
        </div>

        {/* 서브 메뉴 열림/닫힘 화살표 */}
        <img
          className={`subMenu-arrow ${isMenubarOpen ? "" : "subMenu-close"} ${
            isSubMenuOpen ? "subMenu-subMenuOpen" : ""
          }`}
          src="/src/assets/icons/arrow.svg"
          alt="화살표 아이콘"
        />
      </div>

      {/* 서브 메뉴 항목*/}
      <div
        className={`subMenu-subMenuItemsContainer ${
          isMenubarOpen ? "" : "subMenu-close"
        } ${isSubMenuOpen ? "subMenu-subMenuOpen" : ""}`}
      >
        {mailBox.map((title) => (
          <SubMenuItem
            key={title}
            title={title}
            isMenubarOpen={isMenubarOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default SubMenu;
