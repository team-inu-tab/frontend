import "@components/mailBox/css/mailBoxLayout.css";
import MailListHeader from "./mailListHeader";
import MailListHeaderM from "./mailListHeaderM";
import MenuBar from "../menu/menuBar";
import { useMenuStore } from "../../store";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const MailBoxLayout = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mailBoxLayout-wrapper">
      <MenuBar />
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
