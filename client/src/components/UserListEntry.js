import React from 'react';
import { makeCall } from '../socket';

const UserListEntry = ({ username = 'anonymous', id }) => {
  return <li onClick={() => makeCall(id)}>{`${username}, (${id.slice(0, 5)})`}</li>;
};

export default UserListEntry;
