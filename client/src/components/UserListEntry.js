import React from 'react';

const UserListEntry = ({ username = 'anonymous', id }) => {
  return <li>{`${username}, (${id})`}</li>;
};

export default UserListEntry;
