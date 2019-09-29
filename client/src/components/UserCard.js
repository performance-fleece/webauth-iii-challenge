import React from 'react';

const UserCard = props => {
  return (
    <div className="user-card">
      <p>User: {props.user.username}</p>
      <p>Department: {props.user.department}</p>
    </div>
  );
};

export default UserCard;
