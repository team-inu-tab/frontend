import "@components/mailBox/css/mailBoxLayout.css";
import MailListHeader from "./mailListHeader";
import MenuBar from "../menu/menuBar";
import { useMenuStore } from "../../store";
import { Outlet } from "react-router-dom";
import CreateMailButton from "./createMailButton";

const MailBoxLayout = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);

  return (
    <div className="mailBoxLayout">
      <CreateMailButton />
      <div className="mailBoxLayout-wrapper">
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
    </div>
  );
};
export default MailBoxLayout;
