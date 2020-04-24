import React from 'react';
import UserListEntry from './UserListEntry';

const UserList = ({ userList }) => {
  return (
    <div>
      Other users:
      <ul>
        {userList.map(({ name, id }) => (
          <UserListEntry username={name} id={id} key={id} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
