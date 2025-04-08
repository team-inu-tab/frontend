import {react, useEffect} from 'react';
import sendComplete from '@assets/icons/sendComplete.svg';
import '@screens/css/sendCompleteScreen.css';

const SendComplete = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) {
                onComplete();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="completeBackground">
            <img src={sendComplete} className='sendCompleteIcon' alt="전송 완료" />
        </div>
    );
};

export default SendComplete;