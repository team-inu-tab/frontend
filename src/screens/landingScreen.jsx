import React, {useState} from 'react';
import '@css/login.css';
import symbolLogo from '@assets/images/symbolLogo.svg';
import '@screens/css/landingScreen.css';
import GoogleLogin from '@components/common/googleLoginButton.jsx'

function Landing() {
    const [isStartClick, setIsStartClick] = useState(false)
    return (
        <>
            <img src={symbolLogo} className='symbolLogo'></img>
            <GoogleLogin className='startButton'/>
        </>    
    )
}

export default Landing