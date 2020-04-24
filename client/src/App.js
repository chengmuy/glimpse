import React, { useEffect } from 'react';
import socket from './socket';

import UserList from './components/UserList';
import VideoContainer from './components/VideoContainer';
import Controls from './components/game/Controls';
import TeamList from './components/game/TeamList';
import WordDisplay from './components/game/WordDisplay';
import Chat from './components/game/Chat';
import WinnerDisplay from './components/game/WinnerDisplay';

function App() {
  const [sessionId, setSessionId] = React.useState('');
  const [userList, setUserList] = React.useState([]);
  const [gameState, setGameState] = React.useState({
    status: 'not-started',
    teams: { red: [], blue: [] },
    actor: { id: '' },
  });
  const [word, setWord] = React.useState(null);
  const [chatList, setChatList] = React.useState([]);

  useEffect(() => {
    console.log('useEffect');

    // set up socket event listeners
    socket.on('id', (id) => setSessionId(id));

    socket.on('addUsers', ({ users }) => {
      setUserList((userList) => [...userList, ...users]);
    });

    socket.on('removeUser', ({ id }) => {
      setUserList((userList) => userList.filter((user) => user.id !== id));
    });

    socket.on('gameRefresh', (newGameState) => {
      console.log('gameUpdate with state ', newGameState);
      setGameState(newGameState);
    });

    socket.on('gameUpdate', (updatedGameState) => {
      console.log('gameUpdate with state ', updatedGameState);
      setGameState((gameState) => ({ ...gameState, ...updatedGameState }));
    });

    socket.on('wordUpdate', ({ word }) => {
      console.log('wordUpdate with word ', word);
      setWord(word);
    });

    socket.on('chat', (chat) => {
      console.log(`received chat ${chat.text} from ${chat.userId}`);
      setChatList((chatList) => [...chatList, chat]);
    });

    socket.on('correctGuess', ({ word, userId }) => {
      console.log(`correctGuess from user ${userId} with word ${word}`);
    });
  }, []);

  console.log('render app');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Glimpse</h1>
      </header>
      <UserList userList={userList} />
      <VideoContainer />
      <Controls gameStatus={gameState.status} />
      {gameState.actor.id === sessionId && <WordDisplay word={word} />}
      {gameState.winner && <WinnerDisplay word={gameState.revealedWord} userId={gameState.winner} ownId={sessionId} />}
      <Chat chatList={chatList} ownId={sessionId} />
      <TeamList teams={gameState.teams} ownId={sessionId} actorId={gameState.actor.id} />
    </div>
  );
}

export default App;
