import "@components/mailBox/css/mailBoxContainer.css";
import MailListHeader from "./mailListHeader";
import SenderGroupedList from "./senderGroupedList";
import TimeSortedList from "./timeSortedList";
import MenuBar from "../menu/menuBar";
import { useMenuStore, useSortStore, SORT_OPTIONS } from "../../store";

const MailBoxContainer = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const sortOption = useSortStore((state) => state.sortOption);

  return (
    <div className="mailBoxContainer-wrapper">
      <MenuBar />
      <div
        className={`mailBoxContainer-container ${
          isMenuBarOpen ? "menuBar-open" : ""
        }`}
      >
        <MailListHeader />
        <div className="mailBoxContainer-detail">
          {sortOption === SORT_OPTIONS.SENDER ? (
            <SenderGroupedList />
          ) : (
            <TimeSortedList />
          )}
          {/* {selectedGroup && <MailPreviewContainer />}
          {selectedMail && <MailDetail />} */}
        </div>
      </div>
    </div>
  );
};
export default MailBoxContainer;
