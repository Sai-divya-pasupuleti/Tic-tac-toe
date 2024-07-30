
import React, { useState, useEffect } from 'react';
import Box from './Box';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const currentWinner = calculateWinner(squares);
    if (currentWinner) {
      setWinner(currentWinner);
      if (currentWinner === 'X') {
        setScoreX(prevScore => prevScore + 1);
      } else if (currentWinner === 'O') {
        setScoreO(prevScore => prevScore + 1);
      }
      setTimeout(() => {
        setSquares(Array(9).fill(null));
        setWinner(null);
        setIsXNext(true);
      }, 1000); // Reset after 1 second
    }
  }, [squares]);

  const renderBox = (index) => {
    return (
      <Box
        value={squares[index]}
        onClick={() => handleClick(index)}
      />
    );
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="score">
        <p>Player X: {scoreX}</p>
        <p>Player O: {scoreO}</p>
      </div>
      <div className="board-row">
        {renderBox(0)}
        {renderBox(1)}
        {renderBox(2)}
      </div>
      <div className="board-row">
        {renderBox(3)}
        {renderBox(4)}
        {renderBox(5)}
      </div>
      <div className="board-row">
        {renderBox(6)}
        {renderBox(7)}
        {renderBox(8)}
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
