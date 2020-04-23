import React from 'react';
import { startGame } from '../../socket';

class Controls extends React.Component {
  render() {
    return (
      <div>
        <button onClick={startGame}>Start Game</button>
      </div>
    );
  }
}

export default Controls;
