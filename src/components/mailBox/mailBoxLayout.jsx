import "@components/mailBox/css/mailBoxLayout.css";
import MailListHeader from "./mailListHeader";
import MenuBar from "../menu/menuBar";
import { useMailStore, useMenuStore } from "../../store";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useWriteStore } from "../../store/useWriteStore";
import MailWriteModal from "../common/mailWriteModal";

const MailBoxLayout = () => {
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const isWriteModalOpen = useWriteStore((state) => state.isWriteModalOpen);
  const location = useLocation(); // 라우팅 경로

  useEffect(() => {
    setSelectedMail(null);
  }, [location.pathname]);

  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    if (isWriteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isWriteModalOpen]);

  return (
    <div className="mailBoxLayout-wrapper">
      {/* 모달 조건부 렌더링 */}
      {isWriteModalOpen && (
        <>
          <div className="modal-overlay" />
          <MailWriteModal />
        </>
      )}
      <MenuBar />
      <div
        className={`mailBoxLayout-container ${
          isMenuBarOpen ? "menuBar-open" : ""
        }`}
      >
        <MailListHeader />
        <div className="mailBoxLayout-common">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default MailBoxLayout;
