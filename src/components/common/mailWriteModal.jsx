import React, {useState} from 'react';
import '@components/common/css/mailWriteModal.css';
import MailContainer from '@components/common/mailWriteContainer.jsx';
import ToggleSwitch from '@components/common/toggleSwitch.jsx';
import Link from '@assets/icons/link.svg'
import aiOnLogo from '@assets/icons/ai.svg'
import WriteContainer from '@components/common/mailWritingContainer.jsx';
import CompImg from '@assets/images/SendComplete.svg';
import checkCompImg from '@assets/images/sendCompCheck.svg';

function MailWriteModal() {
    const [isAiOn, setIsAiOn] = useState(false);
    const [isSendClick, setIsSendClick] = useState(false)

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
          {isAiOn && <img src={ aiOnLogo } className='aiOnLogo'></img>}
          <text className={`aiText ${isAiOn ? 'on' : ''}`}>AI 도우미</text>
          <ToggleSwitch 
            className='aiToggleSwitch'
            checked = {isAiOn}
            onChange={() => setIsAiOn(!isAiOn)}/>
        </div>

        <WriteContainer className={isAiOn ? 'writeContainer on' : 'writeContainer'} />

        <div className='buttonContainer'>
          <button className='reservationButton'>예약하기</button>
          <button className="sendButton" onClick={() => setIsSendClick(true)}>전송하기</button>
        </div>

        {isSendClick && <img src={CompImg} className="compImg" />}
        {/* {isSendClick && <img src={checkCompImg} className="sendCheck"></img>}
        {isSendClick && <text className='sendCompText'>전송완료</text>} */}
      </MailContainer>
      
    )
  }
  
  export default MailWriteModal;