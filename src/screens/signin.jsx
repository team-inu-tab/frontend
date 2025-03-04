import React, {useState} from 'react';
import '@css/signin.css';
import symbolLogo from '@assets/images/symbolLogo.svg';
import Circle from '@components/signin/circle.jsx';
import Container from '@components/signin/parentContainer.jsx';
import CompleteButton from '@components/signin/completeButton.jsx';
import DropDown from '@components/signin/dropDown.jsx';
import InputLine from '@assets/images/inputLine.svg';

function Signin() {
  const [isStudent, setIsStudent] = useState(false);
  const [isFill, setIsFill] = useState(false);
  const jobData = { data: ["학생", "직장인"] };

  return (
    <Container>
        <Circle>
          <img src={symbolLogo} className='symbolLogo'/>
          <text className='jobPlaceHolder'>직업</text>
          <img src={InputLine} className='inputLine'></img>
          <DropDown props={jobData}></DropDown>
          <CompleteButton className='addInfoCompleteButton' text="입력완료"></CompleteButton>
        </Circle>
    </Container>
  )
}

export default Signin