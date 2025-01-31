// src/components/common/Circle.jsx
import React from 'react';
import '@components/signin/css/circle.css'; // 변환된 CSS 파일 임포트

function Circle({ children }) {
  return <div className="circle">{children}</div>;
}

export default Circle;
