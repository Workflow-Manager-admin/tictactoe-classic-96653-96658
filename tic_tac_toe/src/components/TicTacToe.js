import React, { useState } from 'react';
import Board from './Board';
import './TicTacToe.css';

// Helper function to determine the winner
const calculateWinner = (squares) => {
  // All possible winning combinations (rows, columns, diagonals)
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal from top-left
    [2, 4, 6]  // diagonal from top-right
  ];

  // Check if any winning combination has the same non-null value
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningLine: lines[i]
      };
    }
  }

  // If all squares are filled and no winner, it's a draw
  if (squares.every(square => square !== null)) {
    return { winner: 'draw' };
  }

  // No winner yet
  return null;
};

// PUBLIC_INTERFACE
/**
 * TicTacToe component is the main container for the Tic Tac Toe game.
 * It manages the game state and implements the game logic.
 * 
 * @returns {JSX.Element} - Rendered TicTacToe component
 */
function TicTacToe() {
  // State to track whose turn it is
  const [xIsNext, setXIsNext] = useState(true);
  
  // State for storing the game history
  const [history, setHistory] = useState([Array(9).fill(null)]);
  
  // State for the current move number
  const [stepNumber, setStepNumber] = useState(0);
  
  // Get the current board state from history
  const current = history[stepNumber];
  
  // Calculate the winner (if any)
  const winInfo = calculateWinner(current);
  
  // Determine the status message to display
  let status;
  if (winInfo && winInfo.winner === 'draw') {
    status = "Game ended in a draw!";
  } else if (winInfo) {
    status = `Winner: ${winInfo.winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  /**
   * Handles clicking on a square
   * @param {number} i - Index of the clicked square (0-8)
   */
  const handleClick = (i) => {
    // Get the history up to the current move
    const historyCopy = history.slice(0, stepNumber + 1);
    const current = historyCopy[historyCopy.length - 1];
    
    // Create a new copy of the squares array
    const squaresCopy = [...current];
    
    // Return if the game is over or the square is already filled
    if (calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }
    
    // Mark the square with the current player's symbol
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    
    // Update the game state
    setHistory([...historyCopy, squaresCopy]);
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
  };

  /**
   * Resets the game to the initial state
   */
  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  return (
    <div className="tictactoe-container">
      <div className="game-title">
        <h1>Tic Tac Toe Classic</h1>
        <p className="game-description">
          Take turns to mark X or O on the grid and try to get three in a row.
        </p>
      </div>

      <div className="game">
        <div className="game-board">
          <Board 
            squares={current}
            onClick={handleClick}
          />
        </div>

        <div className="game-info">
          <div className="status">{status}</div>
          {(winInfo || current.some(square => square !== null)) && (
            <button className="btn reset-btn" onClick={resetGame}>
              New Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;
