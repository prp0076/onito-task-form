import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age/Sex</th>
          <th>Mobile</th>
          <th>Address</th>
          <th>Govt ID</th>
          <th>Guardian Details</th>
          <th>Nationality</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{`${user.age}/${user.sex}`}</td>
            <td>{user.mobile}</td>
            <td>{`${user.address.city}, ${user.address.state}, ${user.address.country}, ${user.address.pincode}`}</td>
            <td>{user.govtId}</td>
            <td>{user.guardianDetails}</td>
            <td>{user.nationality}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
