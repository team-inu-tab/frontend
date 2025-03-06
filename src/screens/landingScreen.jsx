import React, {useState} from 'react';
import symbolLogo from '@assets/images/symbolLogo.svg';
import '@screens/css/landingScreen.css';
import GoogleLogin from '@components/common/googleLoginButton.jsx'

function Landing() {
    return (
        <>
            <img src={symbolLogo} className='symbolLogo'></img>
            <GoogleLogin className='startButton'/>
        </>    
    )
}

export default Landing