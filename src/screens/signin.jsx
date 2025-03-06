import React, {useState} from 'react';
import '@css/signin.css';
import symbolLogo from '@assets/images/symbolLogo.svg';
import Circle from '@components/signin/circle.jsx';
import Container from '@components/signin/parentContainer.jsx';
import CompleteButton from '@components/signin/completeButton.jsx';
import DropDown from '@components/signin/dropDown.jsx';
import InputLine from '@assets/images/inputLine.svg';

function Signin() {
  const [selectedJob, setSelectedJob] = useState("");
  const jobData = { data: ["학생", "직장인"] };

  const renderJobText = (value) => {
    setSelectedJob(value);
    if (value === "학생") setSelectedJob("학교");
    else if (value === "직장인") setSelectedJob("회사");
    else setSelectedJob("");
  };

  return (
    <Container>
        <Circle>
          <img src={symbolLogo} className='symbolLogo'/>
          <span className='jobPlaceHolder'>직업</span>
          <img src={InputLine} className='inputLine1'></img>
          <DropDown props={jobData} onSelect={renderJobText} />
          <span className="jobText">{selectedJob}</span>
          {selectedJob && <input className='affiliationInput'></input>}
          {selectedJob === "학교" && <span className='departmentPlaceHolder'>학과</span>}
          {selectedJob === "회사" && <span className='departmentPlaceHolder'>부서</span>}
          {selectedJob && <img src={InputLine} className='inputLine2'></img>}
          {selectedJob === "학교" && <input className='departmentInput'></input>}
          {selectedJob === "회사" && <input className='departmentInput'></input>}
          {selectedJob === "학교" && <span className='positionPlaceHolder'>학번</span>}
          {selectedJob === "회사" && <span className='positionPlaceHolder'>직책</span>}
          {selectedJob === "학교" && <input className='positionInput'></input>}
          {selectedJob === "회사" && <input className='positionInput'></input>}
          <CompleteButton className='addInfoCompleteButton' text="입력완료"></CompleteButton>
        </Circle>
    </Container>
  )
}

export default Signin