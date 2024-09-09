import React, { useState, useEffect } from 'react';
import './App.css';

const gameLogic = (userGuess, numberToGuess, currentScore, setMessage) => {
  if (userGuess === numberToGuess) {
    setMessage(`¡Felicidades! Has adivinado el número.`);
    return currentScore;
  } else {
    setMessage(userGuess < numberToGuess ? 'El número es mayor.' : 'El número es menor.');
    return currentScore - 1;
  }
};

function App() {
  const [numberToGuess, setNumberToGuess] = useState(Math.floor(Math.random() * 20) + 1);
  const [currentScore, setCurrentScore] = useState(10);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [maxScore] = useState(10);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [gameOverMessage, setGameOverMessage] = useState('');

  useEffect(() => {
    if (gameOver) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [gameOver]);

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = '';
  };

  const resetGame = () => {
    setNumberToGuess(Math.floor(Math.random() * 20) + 1);
    setCurrentScore(maxScore);
    setSelectedNumbers([]);
    setMessage('');
    setGameOver(false);
    setShowGrid(true);
    setGameOverMessage('');
  };

  const handleGuess = (number) => {
    const newScore = gameLogic(number, numberToGuess, currentScore, setMessage);
    setCurrentScore(newScore);
    setSelectedNumbers([...selectedNumbers, number]);

    if (newScore === 0) {
      setGameOverMessage(`¡Perdiste! El número era ${numberToGuess}.`);
      setGameOver(true);
      setShowGrid(false);
    } else if (number === numberToGuess) {
      setMessage(`¡Felicidades! Has adivinado el número.`);
      setTimeout(resetGame, 2000);
    }
  };

  const handleTryAgain = () => {
    setGameOver(false);
    resetGame();
  };

  return (
    <div className={`App ${gameOver ? 'game-over' : ''}`}>
      <header className="App-header">
        <h1>Adivina el Número</h1>
        {showGrid && (
          <div className="hangman-container">
            {/* Rejilla de números */}
            <div className="number-grid">
              {[...Array(20)].map((_, i) => {
                const number = i + 1;
                return (
                  <button
                    key={number}
                    onClick={() => handleGuess(number)}
                    disabled={selectedNumbers.includes(number)}
                    className="number-button"
                  >
                    {number}
                  </button>
                );
              })}
            </div>
            <p className="message">{message}</p>
            <div className="exit-button-container">
              <button onClick={resetGame}>Salir</button>
            </div>
          </div>
        )}
        {gameOver && (
          <div className="game-over-container">
            <p className="game-over-message">{gameOverMessage}</p>
            <div className="try-again-container">
              <button onClick={handleTryAgain}>Try Again</button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;