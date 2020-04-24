import React from 'react';
import { startGame } from '../../socket';

class Controls extends React.Component {
  render() {
    return (
      <div>
        <span>
          <button
            onClick={(e) => {
              e.preventDefault();
              startGame();
            }}
          >
            Start Game
          </button>
        </span>
        <span>Game Status: {this.props.gameStatus}</span>
      </div>
    );
  }
}

export default Controls;
