import React from 'react';
import '@components/signin/css/completeButton.css';

function CompleteButton({ className, text }) {
    return <button className={`completeButton ${className}`} >{ text }</button>;
}

export default CompleteButton;