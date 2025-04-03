import "@components/mailBox/css/mailBoxLayout.css";
import MailListHeader from "./mailListHeader";
import MenuBar from "../menu/menuBar";
import { useMailStore, useMenuStore } from "../../store";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useWriteStore } from "../../store/useWriteStore";
import MailWriteModal from "../common/mailWriteModal";

const MailBoxLayout = () => {
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const setSelectedGroup = useMailStore((state) => state.setSelectedGroup);
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const isWriteModalOpen = useWriteStore((state) => state.isWriteModalOpen);
  const toggleWriteModal = useWriteStore((state) => state.toggleWriteModal);
  const location = useLocation();

  const modalRef = useRef(null);

  useEffect(() => {
    setSelectedMail(null);
    setSelectedGroup([]);
  }, [location.pathname]);

  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    if (isWriteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isWriteModalOpen]);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        toggleWriteModal(); // 외부 클릭 시 모달 닫기
      }
    };

    if (isWriteModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isWriteModalOpen, toggleWriteModal]);

  return (
    <div className="mailBoxLayout-wrapper">
      {/* 모달 조건부 렌더링 */}
      {isWriteModalOpen && (
        <>
          <div className="modal-overlay" />
          <div className="modal-wrapper" ref={modalRef}>
            {/* 모달 내부 내용 */}
            <MailWriteModal />
          </div>
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
