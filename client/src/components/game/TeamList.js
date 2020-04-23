import React from 'react';

const TeamList = ({ teams, ownId }) => {
  return (
    <div>
      Players:
      {Object.keys(teams).map((teamName) => (
        <div key={teamName}>
          {teamName.charAt(0).toUpperCase() + teamName.slice(1) + ':'}
          <ul>
            {teams[teamName].map(({ id, name = 'anonymous' }) => (
              <li key={id}>{id === ownId ? 'you' : `${name}, (${id})`}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
