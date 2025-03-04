import React, { useState, useEffect, useRef } from "react";
import "@components/signin/css/dropDown.css";

export const DropDown = (props) => {
  const list = props.props.data;
  const selectRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(list[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (e) => {
    setCurrentValue(e.target.getAttribute("value"));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  return (
    <div
      className="select-box"
      onClick={() => setShowOptions((prev) => !prev)}
      ref={selectRef}
    >
      <label className="select-label">{currentValue}</label>
      <ul className={`select-options ${showOptions ? "show" : ""}`}>
        {list.map((data, index) => (
          <ul
            key={index}
            className="option"
            value={data}
            onClick={handleOnChangeSelectValue}
          >
            {data}
          </ul>
        ))}
      </ul>
    </div>
  );
};

DropDown.defaultProps = {
  name: "초기값",
};

export default DropDown;