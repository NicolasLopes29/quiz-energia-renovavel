import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import questionsData from './questions.json'; // Import the JSON file
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [numPergunta, setnumPergunta] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [explanation, setExplanation] = useState('');

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleBackToStart = () => {
    setShowQuiz(false);
    setCount(0); // Opcional: redefinir a pontuação ao voltar ao início
    setnumPergunta(1); // Opcional: redefinir o número da pergunta ao voltar ao início
    setSelectedAnswer(null);
    setIsCorrect(null);
    setExplanation('');
  };

  const handleAnswerSelection = (selectedOption) => {
    const currentQuestion = questions[numPergunta - 1];
    const correct = selectedOption === currentQuestion.correct_option;
    setSelectedAnswer(selectedOption);
    setIsCorrect(correct);
    setExplanation(currentQuestion.explanation);

    if (correct) {
      setCount(count + 1);
    }

    setTimeout(() => {
      if (numPergunta < questions.length) {
        setnumPergunta(numPergunta + 1);
      } else {
        alert(`Quiz finished! Your score is ${count + (correct ? 1 : 0)}`);
        handleBackToStart();
      }
      setSelectedAnswer(null);
      setIsCorrect(null);
      setExplanation('');
    }, 5000); // Delay increased to 5 seconds to allow reading the explanation
  };

  useEffect(() => {
    if (showQuiz) {
      setQuestions(questionsData);
    }
  }, [showQuiz]);

  return (
    <>
      {!showQuiz ? (
        <div>
          <div className="logo-container">
            <a href="" target="_blank">
              <img src={viteLogo} className="logo" alt="Quiz" />
              <h3>Placar de Líderes</h3>
            </a>
            <a onClick={() => setCount(0)} target="_blank">
              <img onClick={handleStartQuiz} src={reactLogo} className="logo react" alt="Energias Renováveis" />
              <h3 onClick={handleStartQuiz}>Iniciar</h3>
            </a>
          </div>
          <h1>Quiz Energias Renováveis</h1>
          <div className="card">
            <a href="https://www.estrategiaods.org.br/os-ods/ods7/" target="_blank" rel="noopener noreferrer">
              <button>Saiba mais sobre o ODS 7</button>
            </a>
            <p>
              Gabriel Vieira, Gustavo Vieira & Nicolas Bustamante
            </p>
          </div>
          <p className="read-the-docs">
            Atividade TI - Senac
          </p>
        </div>
      ) : (
        <div className="quiz-container">
          <a className="btn-voltar" onClick={handleBackToStart}>Voltar ao início</a>
          <p>Pontuação: {count}</p>
          <h2>Pergunta {numPergunta}</h2>
          {questions.length > 0 && (
            <>
              <p>{questions[numPergunta - 1].question}</p>
              <div className="options">
                <button
                  className={`btnA ${selectedAnswer === 'A' ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleAnswerSelection('A')}
                  disabled={selectedAnswer !== null}
                >
                  A) {questions[numPergunta - 1].option_a}
                </button>
                <button
                  className={`btnB ${selectedAnswer === 'B' ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleAnswerSelection('B')}
                  disabled={selectedAnswer !== null}
                >
                  B) {questions[numPergunta - 1].option_b}
                </button>
                <button
                  className={`btnC ${selectedAnswer === 'C' ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleAnswerSelection('C')}
                  disabled={selectedAnswer !== null}
                >
                  C) {questions[numPergunta - 1].option_c}
                </button>
                <button
                  className={`btnD ${selectedAnswer === 'D' ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleAnswerSelection('D')}
                  disabled={selectedAnswer !== null}
                >
                  D) {questions[numPergunta - 1].option_d}
                </button>
              </div>
              {selectedAnswer && <p className="explanation">{explanation}</p>}
              
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;