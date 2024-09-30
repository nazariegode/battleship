import React, { useState } from "react";
import Board from "./Board";

// Función para generar un tablero vacío de 10x10
const generateEmptyBoard = () => {
  return Array(10).fill(null).map(() => Array(10).fill(null));
};

const Game = () => {
  const [playerBoard, setPlayerBoard] = useState(generateEmptyBoard());
  const [cpuBoard, setCpuBoard] = useState(generateEmptyBoard());
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // Lógica para cuando el jugador hace clic en su propio tablero
  const handlePlayerClick = (row, col) => {
    if (!isPlayerTurn || cpuBoard[row][col]) return; // No se puede disparar si no es el turno del jugador o ya disparaste aquí

    // Simula el disparo del jugador en el tablero del CPU
    const newCpuBoard = [...cpuBoard];
    newCpuBoard[row][col] = Math.random() > 0.5 ? "hit" : "miss"; // Simula acierto o fallo
    setCpuBoard(newCpuBoard);

    setIsPlayerTurn(false);

    // Turno del CPU después de un segundo
    setTimeout(cpuTurn, 1000);
  };

  // Lógica para el turno del CPU
  const cpuTurn = () => {
    const row = Math.floor(Math.random() * 10); // Selecciona una fila aleatoria
    const col = Math.floor(Math.random() * 10); // Selecciona una columna aleatoria
    const newPlayerBoard = [...playerBoard];

    // Simula el disparo del CPU al tablero del jugador
    if (!newPlayerBoard[row][col]) {
      newPlayerBoard[row][col] = Math.random() > 0.5 ? "hit" : "miss"; // Acertar o fallar
      setPlayerBoard(newPlayerBoard);
      setIsPlayerTurn(true); // Después del turno del CPU, es el turno del jugador
    } else {
      cpuTurn(); // Si ya disparó aquí, vuelve a intentar en otro lugar
    }
  };

  return (
    <div>
      <h1>Battleship Game</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h2>Your Board (Click to Attack)</h2>
          {/* El jugador hace clic en su propio tablero para atacar al CPU */}
          <Board board={playerBoard} handleClick={handlePlayerClick} />
        </div>
        <div>
          <h2>CPU Board</h2>
          {/* El tablero del CPU muestra el resultado de los ataques del jugador */}
          <Board board={cpuBoard} handleClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Game;
