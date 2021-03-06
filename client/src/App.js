import React, { useEffect } from 'react';
import socket from './socket';

import UserList from './components/UserList';
import VideoContainer from './components/VideoContainer';
import Controls from './components/game/Controls';
import TeamList from './components/game/TeamList';
import WordDisplay from './components/game/WordDisplay';
import Chat from './components/game/Chat';
import WinnerDisplay from './components/game/WinnerDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: '',
      userList: [],
      gameState: {
        status: 'not-started',
        teams: { red: [], blue: [] },
        actor: { id: '' },
      },
      word: null,
      chatList: [],
    };
  }

  componentDidMount() {
    socket.on('id', (id) => this.setState({ sessionId: id }));

    socket.on('addUsers', ({ users }) => {
      this.setState({ userList: [...this.state.userList, ...users] });
    });

    socket.on('removeUser', ({ id }) => {
      this.setState({ userList: this.state.userList.filter((user) => user.id !== id) });
    });

    socket.on('gameRefresh', (newGameState) => {
      console.log('gameUpdate with state ', newGameState);
      this.setState({ gameState: newGameState });
    });

    socket.on('gameUpdate', (updatedGameState) => {
      console.log('gameUpdate with state ', updatedGameState);
      this.setState({ gameState: { ...this.state.gameState, ...updatedGameState } });
    });

    socket.on('wordUpdate', ({ word }) => {
      this.setState({ word });
    });

    socket.on('chat', (chat) => {
      console.log(`received chat ${chat.text} from ${chat.userId}`);
      this.setState({ chatList: [...this.state.chatList, chat] });
    });

    socket.on('correctGuess', ({ word, userId }) => {
      console.log(`correctGuess from user ${userId} with word ${word}`);
    });
  }

  // here
  render() {
    return (
      <div className="is-family-custom">
        <section className="hero is-info is-bold">
          <header className="hero-body">
            <div className="container">
              <h1 className="title is-1">Glimpse</h1>
              <h2 className="subtitle">Did you catch that?</h2>
            </div>
          </header>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-10">
                <VideoContainer />
              </div>
              <div className="column is-2">
                <UserList userList={this.state.userList} />
              </div>
            </div>
          </div>
        </section>
        <section className="section is-paddingless">
          <div className="container">
            <div className="columns">
              <div className="column is-4">
                <Controls gameStatus={this.state.gameState.status} />
                {this.state.gameState.actor.id === this.state.sessionId && (
                  <div className="columns has-text-centered">
                    <div className="column">
                      <WordDisplay word={this.state.word} />
                    </div>
                  </div>
                )}
                {this.state.gameState.winner && (
                  <div className="columns">
                    <div className="column">
                      <WinnerDisplay
                        word={this.state.gameState.revealedWord}
                        userId={this.state.gameState.winner}
                        ownId={this.state.sessionId}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="column is-4">
                <Chat chatList={this.state.chatList} ownId={this.state.sessionId} />
              </div>
              <div className="column is-4">
                <TeamList
                  teams={this.state.gameState.teams}
                  ownId={this.state.sessionId}
                  actorId={this.state.gameState.actor.id}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="section"></section>
      </div>
    );
  }
}

// function App() {
//   const [sessionId, setSessionId] = React.useState('');
//   const [userList, setUserList] = React.useState([]);
//   const [gameState, setGameState] = React.useState({
//     status: 'not-started',
//     teams: { red: [], blue: [] },
//     actor: { id: '' },
//   });
//   const [word, setWord] = React.useState(null);
//   const [chatList, setChatList] = React.useState([]);

//   useEffect(() => {
//     console.log('useEffect');

//     // set up socket event listeners
//     socket.on('id', (id) => setSessionId(id));

//     socket.on('addUsers', ({ users }) => {
//       setUserList((userList) => [...userList, ...users]);
//     });

//     socket.on('removeUser', ({ id }) => {
//       setUserList((userList) => userList.filter((user) => user.id !== id));
//     });

//     socket.on('gameRefresh', (newGameState) => {
//       console.log('gameUpdate with state ', newGameState);
//       setGameState(newGameState);
//     });

//     socket.on('gameUpdate', (updatedGameState) => {
//       console.log('gameUpdate with state ', updatedGameState);
//       setGameState((gameState) => ({ ...gameState, ...updatedGameState }));
//     });

//     socket.on('wordUpdate', ({ word }) => {
//       console.log('wordUpdate with word ', word);
//       setWord(word);
//     });

//     socket.on('chat', (chat) => {
//       console.log(`received chat ${chat.text} from ${chat.userId}`);
//       setChatList((chatList) => [...chatList, chat]);
//     });

//     socket.on('correctGuess', ({ word, userId }) => {
//       console.log(`correctGuess from user ${userId} with word ${word}`);
//     });
//   }, []);

//   console.log('render app');

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Glimpse</h1>
//       </header>
//       <UserList userList={userList} />
//       <VideoContainer />
//       <Controls gameStatus={gameState.status} />
//       {gameState.actor.id === sessionId && <WordDisplay word={word} />}
//       {gameState.winner && <WinnerDisplay word={gameState.revealedWord} userId={gameState.winner} ownId={sessionId} />}
//       <Chat chatList={chatList} ownId={sessionId} />
//       <TeamList teams={gameState.teams} ownId={sessionId} actorId={gameState.actor.id} />
//     </div>
//   );
// }

export default App;
