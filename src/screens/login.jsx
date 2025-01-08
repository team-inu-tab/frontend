import '@css/login.css'
import symbolLogo from '@assets/images/symbolLogo.svg'
import Circle from '@components/circle.jsx'
import Container from '@components/parentContainer.jsx'

function Login() {
  return (
    <Container>
        <Circle>
          <img src={symbolLogo} className='symbolLogo'/>
          <input className='nameInputField'placeholder='이름'/>
          <input className='mailInputField' placeholder='이메일'/>
          <input className='pwInputField'placeholder='비밀번호'/>
          <input className='pwCheckInputField' placeholder='비밀번호 확인'/>
          <input className='hpInputField'placeholder='전화번호'/>
          <input className='hpCheckInputField' placeholder='인증번호'/>
          <div className='inputDot1'></div>
          <div className='inputDot2'></div>
          <div className='inputDot3'></div>
        </Circle>
    </Container>
  )
}

export default Login