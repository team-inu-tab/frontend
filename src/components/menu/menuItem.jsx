import "@components/menu/css/menuItem.css";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import Write from "@assets/icons/write.svg?react";
import Notification from "@assets/icons/notification.svg?react";
import Profile from "@assets/icons/profile.svg?react";
import Settings from "@assets/icons/settings.svg?react";
import { useWriteStore } from "../../store/useWriteStore";

/**
 * MenuItem - 개별 메뉴 아이템 컴포넌트
 * @param {"write" | "notification" | "profile" | "settings"} props.title - 메뉴 제목
 * @param {boolean} props.isMenuBarOpen - 메뉴바가 열려 있는지 여부
 * @returns {JSX.Element} 개별 메뉴 컴포넌트
 */
const MenuItem = ({ title, isMenuBarOpen }) => {
  const location = useLocation();
  const toggleWriteModal = useWriteStore((state) => state.toggleWriteModal);

  /**
   * title 값에 따라 아이콘 이미지 경로 및 한글 메뉴명을 설정
   */
  const { Icon, titleName, link } = useMemo(() => {
    switch (title) {
      case "write":
        return {
          Icon: Write,
          titleName: "메일 쓰기",
          link: null,
        };
      case "notification":
        return {
          Icon: Notification,
          titleName: "알림",
          link: "/notification",
        };
      case "profile":
        return {
          Icon: Profile,
          titleName: "프로필",
          link: "/profile",
        };
      case "settings":
        return {
          Icon: Settings,
          titleName: "설정",
          link: "/setting",
        };
      default:
        return {
          Icon: null,
          titleName: "기본",
          link: null,
        };
    }
  }, [title]);

  const isActive = location.pathname === `${link}`;

  // 공통된 내부 렌더링 블럭
  const content = (
    <>
      {/* 강조 바 */}
      <div
        className={`menuItem-leftBar ${isMenuBarOpen ? "" : "menuItem-close"}`}
      />
      {/* 아이콘 + 텍스트 */}
      <div
        className={`menuItem-container ${
          isMenuBarOpen ? "" : "menuItem-close"
        } ${isActive ? "active" : ""}`}
      >
        {Icon && (
          <Icon
            className={`menuItem-icon ${isMenuBarOpen ? "" : "menuItem-close"}`}
          />
        )}
        <span
          className={`menuItem-text ${isMenuBarOpen ? "" : "menuItem-close"}`}
        >
          {titleName}
        </span>
      </div>
      {/* 닫힌 메뉴바용 hover 툴팁 */}
      <div
        className={`menuItem-shadowBox ${
          isMenuBarOpen ? "" : "menuItem-close"
        }`}
      >
        <span className="menuItem-text">{titleName}</span>
      </div>
    </>
  );

  if (title === "write") {
    return (
      <div
        role="button"
        tabIndex={0}
        className={`menuItem-wrapper ${isMenuBarOpen ? "" : "menuItem-close"}`}
        onClick={toggleWriteModal}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      to={link}
      className={`menuItem-wrapper ${isMenuBarOpen ? "" : "menuItem-close"}`}
    >
      {content}
    </Link>
  );
};

export default MenuItem;
