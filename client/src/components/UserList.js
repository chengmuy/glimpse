import React from 'react';
import UserListEntry from './UserListEntry';

const UserList = ({ userList }) => {
  return (
    <div>
      <ul>
        {userList.map(({ name, id }) => (
          <UserListEntry username={name} userId={id} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
