import "@components/mailBox/css/mailBoxLayout.css";
import MailListHeader from "./mailListHeader";
import MenuBar from "../menu/menuBar";
import { useMenuStore } from "../../store";
import { Outlet } from "react-router-dom";

const MailBoxLayout = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);

  return (
    <div className="mailBoxLayout-wrapper">
      {/* 메뉴바 */}
      <MenuBar />
      <div
        className={`mailBoxLayout-container ${
          isMenuBarOpen ? "menuBar-open" : ""
        }`}
      >
        {/* 메일함 헤더 */}
        <MailListHeader />
        <div className="mailBoxLayout-common">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default MailBoxLayout;
