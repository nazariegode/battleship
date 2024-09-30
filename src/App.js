import React, { useState } from "react";
import Board from "./components/Board";
import "./App.css";

const initialPlayerBoard = Array(10).fill(null).map(() => Array(10).fill(0));

const initialCpuBoard = [
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
];

function App() {
  const [playerBoard, setPlayerBoard] = useState(initialPlayerBoard);
  const [cpuBoard, setCpuBoard] = useState(initialCpuBoard);
  const [playerHits, setPlayerHits] = useState(0); // Contador de impactos del jugador
  const [cpuHits, setCpuHits] = useState(0); // Contador de impactos del CPU

  const fireTorpedo = (rowIndex, colIndex) => {
    const updatedCpuBoard = [...cpuBoard];

    if (updatedCpuBoard[rowIndex][colIndex] === 1) {
      updatedCpuBoard[rowIndex][colIndex] = 2; // Impacto
      setPlayerHits(playerHits + 1); // Incrementa el contador de impactos del jugador
    } else if (updatedCpuBoard[rowIndex][colIndex] === 0) {
      updatedCpuBoard[rowIndex][colIndex] = 3; // Fallo
    }

    setCpuBoard(updatedCpuBoard);
    cpuAttack();
  };

  const cpuAttack = () => {
    const randomRow = Math.floor(Math.random() * 10);
    const randomCol = Math.floor(Math.random() * 10);
    const updatedPlayerBoard = [...playerBoard];

    if (updatedPlayerBoard[randomRow][randomCol] === 0) {
      updatedPlayerBoard[randomRow][randomCol] = 3; // Fallo del CPU
    } else if (updatedPlayerBoard[randomRow][randomCol] === 1) {
      updatedPlayerBoard[randomRow][randomCol] = 2; // Impacto del CPU
      setCpuHits(cpuHits + 1); // Incrementa el contador de impactos del CPU
    }

    setPlayerBoard(updatedPlayerBoard);
  };

  // Determina quién va ganando
  const determineWinner = () => {
    if (playerHits > cpuHits) return "Jugador está ganando";
    if (cpuHits > playerHits) return "CPU está ganando";
    return "Empate";
  };

  return (
    <div className="App">
      <h1>Battleship</h1>
      <p>
        Los colores rojo y blanco indican el resultado de un ataque (disparo) en el tablero:
        <br />
        <strong>Rojo:</strong> Indica que el ataque ha sido un impacto en un barco enemigo.
        <br />
        <strong>Blanco:</strong> Indica que el ataque ha sido un fallo.
      </p>
      <div className="boards">
        <div className="board-container">
          <h2 className="names">Jugador</h2>
          <Board gameBoard={playerBoard} fireTorpedo={fireTorpedo} />
          <p>Impactos del Jugador: {playerHits}</p>
        </div>
        <div className="board-container">
          <h2 className="names">CPU</h2>
          <Board gameBoard={cpuBoard} fireTorpedo={() => {}} />
          <p>Impactos del CPU: {cpuHits}</p>
        </div>
      </div>
      <h2>{determineWinner()}</h2> {/* Muestra quién va ganando */}
    </div>
  );
}

export default App;
