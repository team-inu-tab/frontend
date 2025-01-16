import React from 'react';
import '@components/signin/css/textInput.css';

function TextInputTop({ className, placeholder }) {
    return <input className={`inputTop ${className}`} placeholder={placeholder} />;
}

export default TextInputTop;
