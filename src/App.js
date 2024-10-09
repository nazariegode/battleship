import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";

// Tableros predefinidos
const predefinedPlayerBoard = [
    [1,1,1,1,1,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0],
    [1,0,0,1,1,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,0,0,0,0,0,0]
];

const predefinedCpuBoard = [
    [0,0,0,0,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,1,0],
    [1,0,0,0,0,0,0,0,1,0],
    [1,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0]
];

// Componente principal de la aplicación
function App() {
    const [playerBoard, setPlayerBoard] = useState(predefinedPlayerBoard); // Tablero fijo para el jugador
    const [cpuBoard, setCpuBoard] = useState(predefinedCpuBoard); // Tablero fijo para la CPU
    const [playerHits, setPlayerHits] = useState(0); // Contador de impactos del jugador
    const [cpuHits, setCpuHits] = useState(0); // Contador de impactos del CPU
    const [showPlayerShips, setShowPlayerShips] = useState(false); // Estado para mostrar barcos del jugador
    const [gameOver, setGameOver] = useState(false); // Estado para verificar si el juego terminó
    const [message, setMessage] = useState(""); // Mensaje del ganador

    // Función para mostrar la ubicación de los barcos del jugador
    const togglePlayerShips = () => {
        setShowPlayerShips(!showPlayerShips);
    };

    const fireTorpedo = (rowIndex, colIndex) => {
        if (gameOver) return; // Si el juego ha terminado, no permitir más ataques

        const updatedCpuBoard = [...cpuBoard];

        if (updatedCpuBoard[rowIndex][colIndex] === 1) {
            updatedCpuBoard[rowIndex][colIndex] = 2; // Impacto
            setPlayerHits(playerHits + 1); // Incrementa el contador de impactos del jugador
        } else if (updatedCpuBoard[rowIndex][colIndex] === 0) {
            updatedCpuBoard[rowIndex][colIndex] = 3; // Fallo
        }

        setCpuBoard(updatedCpuBoard); // Actualiza el tablero de la CPU
        cpuAttack(); // Ataque del CPU

        checkGameOver(); // Verificar si el juego ha terminado
    };

    const cpuAttack = () => {
        let attacked = false;
        while (!attacked) {
            const randomRow = Math.floor(Math.random() * 10);
            const randomCol = Math.floor(Math.random() * 10);
            const updatedPlayerBoard = [...playerBoard];

            if (updatedPlayerBoard[randomRow][randomCol] === 0) {
                updatedPlayerBoard[randomRow][randomCol] = 3; // Fallo del CPU
                attacked = true;
            } else if (updatedPlayerBoard[randomRow][randomCol] === 1) {
                updatedPlayerBoard[randomRow][randomCol] = 2; // Impacto del CPU
                setCpuHits(cpuHits + 1);
                attacked = true;
            }

            setPlayerBoard(updatedPlayerBoard); // Actualiza el tablero del jugador
        }
    };

    // Función para verificar si todas las casillas han sido atacadas
    const checkGameOver = () => {
        const allPlayerCellsAttacked = playerBoard.flat().every(cell => cell !== 1); // No quedan barcos sin atacar
        const allCpuCellsAttacked = cpuBoard.flat().every(cell => cell !== 1);

        if (allPlayerCellsAttacked && allCpuCellsAttacked) {
            setGameOver(true); // Termina el juego
            determineWinner(); // Determinar el ganador
        }
    };

    const determineWinner = () => {
        if (playerHits > cpuHits) {
            setMessage("¡El jugador ganó!");
        } else if (cpuHits > playerHits) {
            setMessage("¡La CPU ganó!");
        } else {
            setMessage("¡Es un empate!");
        }
    };

    const resetGame = () => {
        window.location.reload(); // Recarga la página
    };

    return (
        <div className="App">
            <h1>Battleship</h1>
            <p>
                Los colores rojo y blanco indican el resultado de un ataque:
                <br />
                <strong>Rojo:</strong> Impacto en un barco.
                <br />
                <strong>Blanco:</strong> Fallo.
            </p>
            <div className="boards">
                <div className="board-container">
                    <h2 className="names">Tablero Jugador</h2>
                    <Board gameBoard={playerBoard} fireTorpedo={() => {}} isPlayerBoard={true} showShips={showPlayerShips} /> {/* Tablero del jugador */}
                    <p>Impactos del Jugador: {playerHits}</p>
                </div>
                <div className="board-container">
                    <h2 className="names">Tablero CPU</h2>
                    <Board gameBoard={cpuBoard} fireTorpedo={fireTorpedo} isPlayerBoard={false} showShips={showPlayerShips} /> {/* Tablero de la CPU */}
                    <p>Impactos del CPU: {cpuHits}</p>
                </div>
            </div>
            <button onClick={togglePlayerShips}>
                {showPlayerShips ? "Ocultar Barcos Jugador" : "Mostrar Barcos Jugador"}
            </button>
            <h2>{message}</h2>
            <button onClick={resetGame}>Reiniciar Juego</button>
        </div>
    );
}

export default App;
