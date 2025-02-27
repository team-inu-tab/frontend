import React, {useState} from 'react';
import '@css/signin.css';
import symbolLogo from '@assets/images/symbolLogo.svg';
import Circle from '@components/signin/circle.jsx';
import Container from '@components/signin/parentContainer.jsx';
import InputTop from '@components/signin/textInputTop.jsx';
import InputBottom from '@components/signin/textInputBottom.jsx';
import Dropdown from '@components/signin/dropDown.jsx';

function Signin() {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  return (
    <Container>
        <Circle>
          <img src={symbolLogo} className='symbolLogo'/>
          <Dropdown>
          </Dropdown>
          {/* <InputTop className='nameInput' placeholder='이름'/>
          <InputBottom className='mailInput' placeholder='이메일'/>
          <InputTop className='pwInput' placeholder='비밀번호'/>
          <InputBottom className='pwCheckInput' placeholder='비밀번호 확인'/>
          <InputTop className='hpInput' placeholder='전화번호'/>
          <InputBottom className='hpCheckInput' placeholder='인증번호'/>

          <div className='inputDot1'></div>
          <div className='inputDot2'></div>
          <div className='inputDot3'></div> */}
        </Circle>
    </Container>
  )
}

export default Signin