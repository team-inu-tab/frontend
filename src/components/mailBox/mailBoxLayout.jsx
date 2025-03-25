import "@components/mailBox/css/mailBoxLayout.css";
import MailListHeader from "./mailListHeader";
import MailListHeaderM from "./mailListHeaderM";
import MenuBar from "../menu/menuBar";
import { useMenuStore } from "../../store";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const MailBoxLayout = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

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
