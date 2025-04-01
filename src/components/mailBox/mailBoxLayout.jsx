import "@components/mailBox/css/mailBoxLayout.css";
import MailListHeader from "./mailListHeader";
import MailListHeaderM from "./mailListHeaderM";
import MenuBar from "../menu/menuBar";
import { useMailStore, useMenuStore } from "../../store";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

const MailBoxLayout = () => {
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const location = useLocation(); // 라우팅 경로

  useEffect(() => {
    setSelectedMail(null);
  }, [location.pathname]);

  return (
    <div className="mailBoxLayout-wrapper">
      {!isMobile && <MenuBar />}
      <div
        className={`mailBoxLayout-container ${
          isMenuBarOpen ? "menuBar-open" : ""
        }`}
      >
        {isMobile ? <MailListHeaderM /> : <MailListHeader />}
        <div className="mailBoxLayout-common">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default MailBoxLayout;
