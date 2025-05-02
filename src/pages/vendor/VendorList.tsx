import React from 'react';

interface Vendor {
  id: number;
  name: string;
  email: string;
}

const VendorList: React.FC = () => {
  const vendors: Vendor[] = [
    { id: 1, name: 'Vendor A', email: 'a@example.com' },
    { id: 2, name: 'Vendor B', email: 'b@example.com' },
    { id: 3, name: 'Vendor C', email: 'c@example.com' },
  ];

  const handleUpdate = (id: number): void => {
    console.log(`Update vendor with ID: ${id}`);
  };

  const handleDelete = (id: number): void => {
    console.log(`Delete vendor with ID: ${id}`);
  };

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <h2 style={{ color: '#6BB7BE', marginBottom: '20px' }}>Vendor List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#6BB7BE', color: '#fff' }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Vendor Info</th>
            <th style={thStyle}>Update</th>
            <th style={thStyle}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor, index) => (
            <tr key={vendor.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>
                <strong>{vendor.name}</strong>
                <br />
                <small>{vendor.email}</small>
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleUpdate(vendor.id)}
                  style={{ ...btnStyle, backgroundColor: '#6BB7BE' }}
                >
                  Update
                </button>
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleDelete(vendor.id)}
                  style={{ ...btnStyle, backgroundColor: '#DC3545' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
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

const btnStyle: React.CSSProperties = {
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer',
};

export default VendorList;
