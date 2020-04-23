import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import UserList from './components/UserList';
import VideoContainer from './components/VideoContainer';

function App() {
  const [userList, setUserList] = React.useState([]);

  useEffect(() => {
    console.log('useEffect');
    const socket = socketIOClient('localhost:4200');

    socket.on('addUsers', ({ users }) => {
      setUserList((userList) => [...userList, ...users]);
    });

    socket.on('removeUser', ({ id }) => {
      setUserList((userList) => userList.filter((user) => user.id !== id));
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Glimpse</h1>
      </header>
      <UserList userList={userList} />
      <VideoContainer />
    </div>
  );
}

export default App;
