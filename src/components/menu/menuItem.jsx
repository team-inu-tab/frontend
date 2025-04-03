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
  const { Icon, titleName, link, onClick } = useMemo(() => {
    switch (title) {
      case "write":
        return {
          Icon: Write,
          titleName: "메일 쓰기",
          link: null,
          onClick: () => {
            toggleWriteModal();
          },
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

  return (
    <Link
      to={link}
      className={`menuItem-wrapper ${isMenuBarOpen ? "" : "menuItem-close"}`}
      onClick={onClick}
    >
      {/* 마우스 hover 시 나타나는 왼쪽 바 (선택된 메뉴 강조 효과) */}
      <div
        className={`menuItem-leftBar ${isMenuBarOpen ? "" : "menuItem-close"}`}
      />

      {/* 메뉴 아이콘과 텍스트 */}
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

      {/* (메뉴바가 닫혀 있을 때) 마우스 hover 시 나타나는 텍스트 칩 */}
      <div
        className={`menuItem-shadowBox ${
          isMenuBarOpen ? "" : "menuItem-close"
        }`}
      >
        <span className="menuItem-text">{titleName}</span>
      </div>
    </Link>
  );
};

export default MenuItem;
