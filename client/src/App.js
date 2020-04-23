import React from 'react';

import UserList from './components/UserList';
import VideoContainer from './components/VideoContainer';

function App() {
  const [userList, setUserList] = React.useState([]);

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
