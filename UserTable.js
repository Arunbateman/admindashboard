import React from 'react';
import './UserTable.css';
import { FaEye } from 'react-icons/fa';

const UserTable = ({ users, onUserClick }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td data-label="Name">{user.name}</td>
            <td data-label="Email">{user.email}</td>
            <td data-label="Status">{user.status || 'Pending'}</td>
            <td data-label="Details">
              <span 
                onClick={() => onUserClick(user.id)} 
                style={{ cursor: 'pointer' }}
              >
                <FaEye />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
