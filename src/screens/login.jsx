import React from 'react';
import '@css/login.css';
import symbolLogo from '@assets/images/symbolLogo.svg';
import Circle from '@components/signin/circle.jsx';
import Container from '@components/signin/parentContainer.jsx';
import InputTop from '@components/signin/textInputTop.jsx';
import CompleteButton from '@components/login/completeButton.jsx';

function Login() {
  return (
    <Container>
        <Circle>
          <img src={symbolLogo} className='symbolLogo'/>

          <InputTop className='mailInputField' placeholder='이메일'></InputTop>
          <InputTop className='pwInputField' placeholder='비밀번호'></InputTop>
          <CompleteButton className='completeButton' text='로그인'/>

          <div className='inputDot1'></div>
          <div className='inputDot2'></div>
        </Circle>
    </Container>
  )
}

export default Login