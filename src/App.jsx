import { useState } from 'react'
import './App.css'
import symbolLogo from './assets/images/symbolLogo.svg'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={symbolLogo} className="logo" alt="매일, mail" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={symbolLogo} className="logo react" alt="매일, mail" />
        </a>
      </div>
      <h1>타이핑은 최소로, 완성은 TAB으로.</h1>
    </>
  )
}

export default App