import React, { useEffect, useState } from 'react';

type User = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
};

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://book-my-space-eta.vercel.app/api/auth/signup');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.users);
        console.log('Fetched Users:', data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <h2 style={{ color: '#6BB7BE', marginBottom: '20px' }}>User List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#6BB7BE', color: '#fff' }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>User Info</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Created At</th>
            <th style={thStyle}>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id || index} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>
                  <strong>{user.name || 'N/A'}</strong>
                  <br />
                  <small>{user.email || 'N/A'}</small>
                </td>
                <td style={tdStyle}>{user.phone || 'N/A'}</td>
                <td style={tdStyle}>{user.address || 'N/A'}</td>
                <td style={tdStyle}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
                </td>
                <td style={tdStyle}>
                  {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'N/A'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle: React.CSSProperties = {
  padding: '12px',
  verticalAlign: 'top',
};

export default UserPage;
