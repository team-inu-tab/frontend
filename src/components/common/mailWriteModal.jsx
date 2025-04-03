// import React, {useState} from 'react';
// import '@components/common/css/mailWriteModal.css';
// import MailContainer from '@components/common/mailWriteContainer.jsx';
// import ToggleSwitch from '@components/common/toggleSwitch.jsx';
// import Link from '@assets/icons/link.svg'
// import aiOnLogo from '@assets/icons/ai.svg'
// import WriteContainer from '@components/common/mailWritingContainer.jsx';
// import CompImg from '@assets/images/SendComplete.svg';
// import checkCompImg from '@assets/images/sendCompCheck.svg';
// import Tagify from '@yaireo/tagify';
// import '@yaireo/tagify/dist/tagify.css';

// function MailWriteModal() {
//     const [isAiOn, setIsAiOn] = useState(false);
//     const [isSendClick, setIsSendClick] = useState(false)
//     const [mailTitle, setMailTitle] = useState('');
//     const [recieverTitle, setRecieverTitle] = useState('');
//     const [mailBody, setMailBody] = useState('');

//     const sendMail = async () => {
//       const payload = {
//         toEmail: recieverTitle,
//         subject: mailTitle,
//         body: mailBody
//       };
  
//       try {
//         const response = await fetch("https://maeilmail.co.kr/api/mails/send", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(payload)
//         });
  
//         if (!response.ok) {
//           throw new Error("메일 전송 실패");
//         }
//         console.log("메일 전송 성공");
//       } catch (error) {
//         console.error("메일 전송 중 오류 발생:", error);
//       }
//     };

//     return (
//       <MailContainer>
//         <input className='mailTitle' 
//                 placeholder='제목을 입력하세요.' 
//                 value={mailTitle} 
//                 onChange={(e) => setMailTitle(e.target.value)}
//                 />

//         <div className='recieverTitleContainer'>
//             <text className='recieverLabel'>받는사람</text>
//             <div className='recieverWrapper'></div>
//             <input className='recieverTitle'
//                     value={recieverTitle}

//                     onChange={(e) => setRecieverTitle(e.target.value)}
//             />
//             <text className='toMeText'>내게 쓰기</text>
//             <input type='checkbox' className='isToMe'></input>
//         </div>

//         <div className='refTitleContainer'>
//           <text className='refLabel'>참조</text>
//           <input className='refTitle'/>
//         </div>

//         <div className='attachedContainer'>
//           <img src={ Link } className='attatchedIcon'></img>
//           <text className='attachedLabel'>DROP HERE!</text>
//         </div>

//         <div className='switchContainer'>
//           {isAiOn && <img src={ aiOnLogo } className='aiOnLogo'></img>}
//           <text className={`aiText ${isAiOn ? 'on' : ''}`}>AI 도우미</text>
//           <ToggleSwitch 
//             className='aiToggleSwitch'
//             checked = {isAiOn}
//             onChange={() => setIsAiOn(!isAiOn)}/>
//         </div>

//         <WriteContainer className={isAiOn ? 'writeContainer on' : 'writeContainer'} 
//                         value={mailBody}
//                         onChange={setMailBody}
//         />

//         <div className='buttonContainer'>
//           <button className='reservationButton'>예약하기</button>
//           <button className="sendButton" 
//                   onClick={() => {
//                     sendMail();
//                     setIsSendClick(true);}}
//                   >전송하기</button>
//         </div>

//         {isSendClick && <img src={CompImg} className="compImg" />}
//         {/* {isSendClick && <img src={checkCompImg} className="sendCheck"></img>}
//         {isSendClick && <text className='sendCompText'>전송완료</text>} */}
//       </MailContainer>
      
//     )
//   }
  
//   export default MailWriteModal;


import React, { useState, useRef, useEffect } from 'react';
import '@components/common/css/mailWriteModal.css';
import MailContainer from '@components/common/mailWriteContainer.jsx';
import ToggleSwitch from '@components/common/toggleSwitch.jsx';
import Link from '@assets/icons/link.svg';
import aiOnLogo from '@assets/icons/ai.svg';
import WriteContainer from '@components/common/mailWritingContainer.jsx';
import CompImg from '@assets/images/SendComplete.svg';
import checkCompImg from '@assets/images/sendCompCheck.svg';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';

function MailWriteModal() {
  const [isAiOn, setIsAiOn] = useState(false);
  const [isSendClick, setIsSendClick] = useState(false);
  const [mailTitle, setMailTitle] = useState('');
  const [recieverTitle, setRecieverTitle] = useState('');
  const [mailBody, setMailBody] = useState('');

  const tagifyInputRef = useRef(null);
  let tagifyInstance = null;

  useEffect(() => {
    if (tagifyInputRef.current) {
      tagifyInstance = new Tagify(tagifyInputRef.current, {
      });

      tagifyInstance.on('change', (e) => {
        setRecieverTitle(e.detail.value);
      });
    }
    return () => {
      if (tagifyInstance) {
        tagifyInstance.destroy();
      }
    };
  }, []);

  const sendMail = async () => {
    const payload = {
      toEmail: recieverTitle,
      subject: mailTitle,
      body: mailBody,
    };

    try {
      const response = await fetch("https://maeilmail.co.kr/api/mails/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("메일 전송 실패");
      }
      console.log("메일 전송 성공");
    } catch (error) {
      console.error("메일 전송 중 오류 발생:", error);
    }
  };

  return (
    <MailContainer>
      <input
        className="mailTitle"
        placeholder="제목을 입력하세요."
        value={mailTitle}
        onChange={(e) => setMailTitle(e.target.value)}
      />

      <div className="recieverTitleContainer">
        <text className="recieverLabel">받는사람</text>
        <input
          ref={tagifyInputRef}
          className="recieverTitle"
        />
        <text className="toMeText">내게 쓰기</text>
        <input type="checkbox" className="isToMe" />
      </div>

      <div className="refTitleContainer">
        <text className="refLabel">참조</text>
        <input className="refTitle" />
      </div>

      <div className="attachedContainer">
        <img src={Link} className="attatchedIcon" alt="link icon" />
        <text className="attachedLabel">DROP HERE!</text>
      </div>

      <div className="switchContainer">
        {isAiOn && <img src={aiOnLogo} className="aiOnLogo" alt="ai on logo" />}
        <text className={`aiText ${isAiOn ? 'on' : ''}`}>AI 도우미</text>
        <ToggleSwitch
          className="aiToggleSwitch"
          checked={isAiOn}
          onChange={() => setIsAiOn(!isAiOn)}
        />
      </div>

      <WriteContainer
        className={isAiOn ? 'writeContainer on' : 'writeContainer'}
        value={mailBody}
        onChange={setMailBody}
      />

      <div className="buttonContainer">
        <button className="reservationButton">예약하기</button>
        <button
          className="sendButton"
          onClick={() => {
            sendMail();
            setIsSendClick(true);
          }}
        >
          전송하기
        </button>
      </div>

      {isSendClick && <img src={CompImg} className="compImg" alt="complete" />}
      {/* {isSendClick && <img src={checkCompImg} className="sendCheck" alt="check" />}
          {isSendClick && <text className="sendCompText">전송완료</text>} */}
    </MailContainer>
  );
}

export default MailWriteModal;