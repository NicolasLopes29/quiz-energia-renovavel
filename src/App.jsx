import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="logo-container">
        <a href="" target="_blank">
          <img src={viteLogo} className="logo" alt="Quiz" />
          <h3>Placar de Líderes</h3>
        </a>
        <a href="" target="_blank">
          <img src={reactLogo} className="logo react" alt="Energias Renováveis" />
          <h3>Iniciar</h3>
        </a>
      </div>
      <h1>Quiz Energias Renováveis</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Créditos {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Atividade TI - Senac
      </p>
    </>
  )
}

export default App