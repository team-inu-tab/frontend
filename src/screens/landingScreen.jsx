import React, {useState} from 'react';
import symbolLogo from '@assets/images/symbolLogo.svg';
import '@screens/css/landingScreen.css';
import GoogleLogin from '@components/common/googleLoginButton.jsx';
import landingAI from '@assets/icons/landingAI.svg';
import serviceStartButton from '@assets/icons/serviceStartButton.svg';
import function1 from '@assets/icons/function1.svg';
import function2 from '@assets/icons/function2.svg';
import function3 from '@assets/icons/function3.svg';
import functionState1 from '@assets/images/functionState1.svg';
import functionState2 from '@assets/images/functionState2.svg';

function Landing() {
    return (
        <div className='landingBackground'>
            <img src={symbolLogo} className='landingSymbolLogo'/>
            <p className='serviceText'>Maeil, MAIL.</p>
            <img src={landingAI} className='landingAILogo'></img>
            <p className='introText'>생성형 AI를 이용한 메일 자동 교정 서비스</p>
            <button className='serviceStartButton'>
                <img src={serviceStartButton} className='buttonImg'></img>
                Start now
            </button>
            <p className='catchphraseShadow'>Type less, let Tab do the rest.</p>
            <p className='catchphrase1'>Type less, let Tab do the rest.</p>
            <p className='catchphrase2'>타이핑은 최소로, 완성은 탭으로.</p>

            <div className='functionContainer'>
                {/* <p className='subState'>AI가 당신의 메일을 분석합니다.</p> */}
                <div className='function1Wrapper'>
                    <img src = {function1} className='function1'></img>
                    <img src = {functionState1} className='funcState1'></img>
                </div>
                
                <div className='function2Wrapper'>
                    <img src = {function2} className='function2'></img>
                    <img src = {functionState2} className='funcState2'></img>
                </div>
                {/* <img src = {function3} className='function3'></img>
                <div className='function3Modal'></div> */}
            </div>
            <GoogleLogin/>
        </div>
    )
}

export default Landing