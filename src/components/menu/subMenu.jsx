import SubMenuItem from "./SubMenuItem";
import { useState } from "react";
import "../menu/css/subMenu.css";

const SubMenu = ({ isMenubarOpen }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => setIsSubMenuOpen((prev) => !prev);

  return (
    <div className={`subMenu-wrapper ${isMenubarOpen ? "" : "subMenu-close"}`}>
      <div
        className={`subMenu-leftBar ${isMenubarOpen ? "" : "subMenu-close"}`}
      />
      <div
        className={`subMenu-container ${isMenubarOpen ? "" : "subMenu-close"}`}
        onClick={toggleSubMenu}
      >
        <div
          className={`subMenu-textContainer ${
            isMenubarOpen ? "" : "subMenu-close"
          }`}
        >
          <img
            className={`subMenu-icon ${isMenubarOpen ? "" : "subMenu-close"}`}
            src="/src/assets/icons/mailbox.svg"
          />
          <span
            className={`subMenu-text ${isMenubarOpen ? "" : "subMenu-close"}`}
          >
            메일함
          </span>
        </div>
        <img
          className={`subMenu-arrow ${isMenubarOpen ? "" : "subMenu-close"} ${
            isSubMenuOpen ? "subMenu-subMenuOpen" : ""
          }`}
          src="/src/assets/icons/arrow.svg"
        />
      </div>
      <div
        className={`subMenu-subMenuItemsContainer ${
          isMenubarOpen ? "" : "subMenu-close"
        } ${isSubMenuOpen ? "subMenu-subMenuOpen" : ""}`}
      >
        {["보낸 메일함", "내게 쓴 메일함", "받은 메일함", "예약 메일함"].map(
          (title) => (
            <SubMenuItem
              key={title}
              title={title}
              isMenubarOpen={isMenubarOpen}
            />
          )
        )}
      </div>
    </div>
  );
};

export default SubMenu;
