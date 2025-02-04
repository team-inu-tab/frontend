import React from 'react';
import '@components/common/css/mailWriteModal.css';
import MailContainer from '@components/common/MailWriteContainer.jsx';

function MailWriteModal() {
    return (
      <MailContainer>
        <input className='mailTitle' placeholder='제목을 입력하세요...'/>
        <div className='recieverTitleContainer'>
            받는사람
            <input className='recieverTitle'/>
            <input type='checkbox' className='isToMe'></input>
        </div>
      </MailContainer>
    )
  }
  
  export default MailWriteModal;