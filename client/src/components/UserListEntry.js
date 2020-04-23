import React from 'react';
import { makeCall } from '../socket';

const UserListEntry = ({ username = 'anonymous', id }) => {
  return <li onClick={() => makeCall(id)}>{`${username}, (${id})`}</li>;
};

export default UserListEntry;
