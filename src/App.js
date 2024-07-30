// App.js
import React from 'react';
import Game from './Game';
import './App.css';

const App = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Game />
      </div>
    </div>
  );
};

export default App;
