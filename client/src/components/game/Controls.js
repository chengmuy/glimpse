import React from 'react';
import { startGame } from '../../socket';

class Controls extends React.Component {
  render() {
    return (
      <>
        <div className="columns has-text-centered">
          <div className="column">
            <div className="title is-3">Game Status: {this.props.gameStatus}</div>
          </div>
        </div>
        <div className="columns has-text-centered">
          <div className="column is-paddingless">
            <button
              className="button is-rounded is-family-custom"
              onClick={(e) => {
                e.preventDefault();
                startGame();
              }}
            >
              Start Game
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Controls;
