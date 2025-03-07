import React, { useState, useEffect, useRef } from "react";
import "@components/signin/css/dropDown.css";

export const DropDown = (props) => {
  const list = props.props.data;
  const selectRef = useRef(null);
  // 초기 상태를 "직업을 선택 해주세요"로 설정합니다.
  const [currentValue, setCurrentValue] = useState("직업을 선택 해주세요");
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    const value = e.target.getAttribute("value");
    setCurrentValue(value);
    if (props.onSelect) {
      props.onSelect(value);
    }
    setShowOptions(false);
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
          <li
            key={index}
            className="option"
            value={data}
            onClick={handleOnChangeSelectValue}
          >
            {data}
          </li>
        ))}
      </ul>
    </div>
  );
};

DropDown.defaultProps = {
  props: { data: ["초기값"] },
};

export default DropDown;