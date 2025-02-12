import React from 'react';
import '@components/common/css/mailWriteModal.css';
import MailContainer from '@components/common/MailWriteContainer.jsx';
import ToggleSwitch from '@components/common/toggleSwitch.jsx';
import Link from '@assets/icons/link.svg'
import aiOnLogo from '@assets/icons/ai.svg'
import WriteContainer from '@components/common/mailWritingContainer.jsx';

function MailWriteModal() {
    return (
      <MailContainer>
        <input className='mailTitle' placeholder='제목을 입력하세요.'/>

        <div className='recieverTitleContainer'>
            <text className='recieverLabel'>받는사람</text>
            <input className='recieverTitle'/>
            <text className='toMeText'>내게 쓰기</text>
            <input type='checkbox' className='isToMe'></input>
        </div>

        <div className='refTitleContainer'>
          <text className='refLabel'>참조</text>
          <input className='refTitle'/>
        </div>

        <div className='attachedContainer'>
          <img src={ Link } className='attatchedIcon'></img>
          <text className='attachedLabel'>DROP HERE!</text>
        </div>

        <div className='switchContainer'>
          <img src={ aiOnLogo } className='aiOnLogo'></img>
          <text className='aiText'>AI 도우미</text>
          <ToggleSwitch className='aiToggleSwitch'/>
        </div>

        <WriteContainer className='writeContainer'>
        </WriteContainer>
      </MailContainer>
    )
  }
  
  export default MailWriteModal;