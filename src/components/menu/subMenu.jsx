import SubMenuItem from "./SubMenuItem";
import { useState } from "react";
import "../menu/css/subMenu.css";

/**
 * SubMenu - 메일 관련 서브 메뉴 컴포넌트
 * @param {boolean} props.isMenubarOpen - 메뉴바가 열려 있는지 여부
 * @returns {JSX.Element} 서브 메뉴 컴포넌트
 */
const SubMenu = ({ isMenubarOpen }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // 서브 메뉴 열림/닫힘 상태 관리

  /**
   * 메일함 카테고리 목록
   */
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

  /**
   * 서브 메뉴의 열림/닫힘 상태를 변경하는 함수
   */
  const toggleSubMenu = () => setIsSubMenuOpen((prev) => !prev);

  return (
    <div className={`subMenu-wrapper ${isMenubarOpen ? "" : "subMenu-close"}`}>
      {/* 마우스 hover 시 나타나는 왼쪽 바 (선택 강조 효과) */}
      <div
        className={`subMenu-leftBar ${isMenubarOpen ? "" : "subMenu-close"}`}
      />

      {/* 서브 메뉴 제목 및 클릭 시 확장/축소 기능 */}
      <div
        className={`subMenu-container ${isMenubarOpen ? "" : "subMenu-close"}`}
        onClick={toggleSubMenu}
      >
        {/* 서브 메뉴 아이콘 및 제목 */}
        <div
          className={`subMenu-textContainer ${
            isMenubarOpen ? "" : "subMenu-close"
          }`}
        >
          <img
            className={`subMenu-icon ${isMenubarOpen ? "" : "subMenu-close"}`}
            src="@assets/icons/mailbox.svg"
          />
          <span
            className={`subMenu-text ${isMenubarOpen ? "" : "subMenu-close"}`}
          >
            메일함
          </span>
        </div>

        {/* 서브 메뉴 열림/닫힘 화살표 아이콘 */}
        <img
          className={`subMenu-arrow ${isMenubarOpen ? "" : "subMenu-close"} ${
            isSubMenuOpen ? "subMenu-subMenuOpen" : ""
          }`}
          src="@assets/icons/arrow.svg"
          alt="화살표 아이콘"
        />
      </div>

      {/* 서브 메뉴 항목 (메일함 리스트) */}
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
