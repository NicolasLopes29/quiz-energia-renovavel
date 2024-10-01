import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import questionsData from './questions.json'; // Importar o arquivo JSON
import { db } from './firebase';
import './App.css';
import {collection, addDoc, Timestamp} from 'firebase/firestore'

function App() {
  const [contagem, setContagem] = useState(0);
  const [numPergunta, setNumPergunta] = useState(1);
  const [mostrarQuiz, setMostrarQuiz] = useState(false);
  const [perguntas, setPerguntas] = useState([]);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [estaCorreto, setEstaCorreto] = useState(null);
  const [explicacao, setExplicacao] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState(""); // Novo estado para o nome do usuário

  const iniciarQuiz = () => {
    setMostrarQuiz(true);
  };

  const voltarAoInicio = () => {
    setMostrarQuiz(false);
    setContagem(0); // Opcional: redefinir a pontuação ao voltar ao início
    setNumPergunta(1); // Opcional: redefinir o número da pergunta ao voltar ao início
    setRespostaSelecionada(null);
    setEstaCorreto(null);
    setExplicacao('');
    setNomeUsuario(""); // Redefinir o nome do usuário ao voltar ao início
  };

  const selecionarResposta = (opcaoSelecionada) => {
    const perguntaAtual = perguntas[numPergunta - 1];
    const correto = opcaoSelecionada === perguntaAtual.correct_option;
    setRespostaSelecionada(opcaoSelecionada);
    setEstaCorreto(correto);
    setExplicacao(perguntaAtual.explanation);

    if (correto) {
      setContagem(contagem + 1);
    }

    setTimeout(() => {
      if (numPergunta < perguntas.length) {
        setNumPergunta(numPergunta + 1);
      } else {
        let nome = prompt(`Quiz finalizado! Sua pontuação é ${contagem + (correto ? 1 : 0)}. Por favor, insira seu nome:`);
        setNomeUsuario(nome.substring(0, 12)); // Armazenar o nome do usuário e limitar a 12 caracteres
    
        // Enviar pontuação e nome para o Firestore
        addDoc(collection(db, 'usuarios'), {
          nome: nome.substring(0, 12), // Use a variável `nome` diretamente
          acertos: contagem + 1
        }).then(() => {
          console.log("Dados salvos com sucesso.");
        }).catch((error) => {
          console.error("Erro ao salvar dados: ", error);
        });
    
        voltarAoInicio();
      }
      setRespostaSelecionada(null);
      setEstaCorreto(null);
      setExplicacao('');
    }, 5); // Atraso aumentado para 5 segundos para permitir a leitura da explicação da resposta
  };

  useEffect(() => {
    if (mostrarQuiz) {
      setPerguntas(questionsData);
    }
  }, [mostrarQuiz]);


  return (
    <>
      {!mostrarQuiz ? (
        <div>
          <div className="logo-container">
            <a href="" target="_blank">
              <img src={viteLogo} className="logo" alt="Quiz" />
              <h3>Placar de Líderes</h3>
            </a>
            <a onClick={() => setContagem(0)} target="_blank">
              <img onClick={iniciarQuiz} src={reactLogo} className="logo react" alt="Energias Renováveis" />
              <h3 onClick={iniciarQuiz}>Iniciar</h3>
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
          <a className="btn-voltar" onClick={voltarAoInicio}>Voltar ao início</a>
          <p>Pontuação: {contagem}</p>
          <h2>Pergunta {numPergunta}</h2>
          {perguntas.length > 0 && (
            <>
              <p>{perguntas[numPergunta - 1].question}</p>
              <div className="options">
                <button
                  className={`btnA ${respostaSelecionada === 'A' ? (estaCorreto ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => selecionarResposta('A')}
                  disabled={respostaSelecionada !== null}
                >
                  A) {perguntas[numPergunta - 1].option_a}
                </button>
                <button
                  className={`btnB ${respostaSelecionada === 'B' ? (estaCorreto ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => selecionarResposta('B')}
                  disabled={respostaSelecionada !== null}
                >
                  B) {perguntas[numPergunta - 1].option_b}
                </button>
                <button
                  className={`btnC ${respostaSelecionada === 'C' ? (estaCorreto ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => selecionarResposta('C')}
                  disabled={respostaSelecionada !== null}
                >
                  C) {perguntas[numPergunta - 1].option_c}
                </button>
                <button
                  className={`btnD ${respostaSelecionada === 'D' ? (estaCorreto ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => selecionarResposta('D')}
                  disabled={respostaSelecionada !== null}
                >
                  D) {perguntas[numPergunta - 1].option_d}
                </button>
              </div>
              {respostaSelecionada && <p className="explanation">{explicacao}</p>}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;
