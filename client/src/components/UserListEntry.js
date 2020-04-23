import React from 'react';

const UserListEntry = ({ username, userId }) => {
  return <li>{`${username}, (${userId})`}</li>;
};

export default UserListEntry;
