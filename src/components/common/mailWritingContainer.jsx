import React from 'react';
import '@components/common/css/mailWritingContainer.css';

function WriteContainer({ className, value, onChange }) {
  return (
    <div className={`write-container-wrapper ${className}`}>
      <div className={`write-container-shadow ${className}`}></div>
      <div className={`write-container ${className}`}>
        <textarea className={`writeField ${className}`} 
                  placeholder='내용을 입력하세요.'
                  value={value}
                  onChange={(e) => onChange(e.target.value)}>
        </textarea>
      </div>
    </div>
  );
}

export default WriteContainer;