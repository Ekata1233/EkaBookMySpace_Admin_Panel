'use client';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface ExploreOffice {
  _id: string;
  name: string;
  address: string;
  image: string;
}

interface ExploreOfficeForm {
  name: string;
  address: string;
  image: File | null;
}

const API_URL = 'https://book-my-space-eta.vercel.app/api/explore-office';

const ExploreOfficePage: React.FC = () => {
  const [offices, setOffices] = useState<ExploreOffice[]>([]);
  const [form, setForm] = useState<ExploreOfficeForm>({
    name: '',
    address: '',
    image: null,
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchOffices = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (Array.isArray(json.data)) {
        setOffices(json.data);
      } else {
        console.error('Invalid data format:', json);
      }
    } catch (err) {
      console.error('Error fetching offices:', err);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('address', form.address);
    if (form.image) {
      formData.append('image', form.image);
    }

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/${editId}` : API_URL;

    await fetch(url, {
      method,
      body: formData,
    });

    setForm({ name: '', address: '', image: null });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
    fetchOffices();
  };

  const handleEdit = (office: ExploreOffice) => {
    setForm({
      name: office.name,
      address: office.address,
      image: null, // Reset file input for new selection
    });
    setIsEditing(true);
    setEditId(office._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchOffices();
  };

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h2 style={{ color: '#6BB7BE', marginBottom: '20px' }}>Explore Office Management</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#6BB7BE', color: '#fff' }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Image</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offices.length > 0 ? (
            offices.map((office, index) => (
              <tr key={office._id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{office.name}</td>
                <td style={tdStyle}>{office.address}</td>
                <td style={tdStyle}>
                  <img src={office.image} alt="office" width="80" />
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(office)}
                    style={{ ...btnStyle, backgroundColor: '#6BB7BE' }}
                  >
                    Edit
                  </button>{' '}
                  <button
                    onClick={() => handleDelete(office._id)}
                    style={{ ...btnStyle, backgroundColor: '#DC3545' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                No offices found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ ...btnStyle, backgroundColor: '#6BB7BE' }}
        >
          {showForm ? 'Close Form' : 'Add Office'}
        </button>
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <Form.Group as={Row} className="mb-4" controlId="formName">
            <Form.Label column sm={2} style={labelStyle}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ height: '45px', width: '100%' }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formAddress">
            <Form.Label column sm={2} style={labelStyle}>
              Address
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={form.address}
                onChange={handleChange}
                required
                style={{ height: '45px', width: '100%' }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formImage">
            <Form.Label column sm={2} style={labelStyle}>
              Image
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required={!isEditing}
                style={{ height: '45px', width: '100%' }}
              />
            </Col>
          </Form.Group>

          <div style={{ textAlign: 'right' }}>
            <button type="submit" style={submitStyle}>
              {isEditing ? 'Update' : 'Add'} Office
            </button>
          </div>
        </Form>
      )}
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

const labelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  marginTop: '10px',
  display: 'block',
};

const submitStyle: React.CSSProperties = {
  backgroundColor: '#6BB7BE',
  padding: '10px 20px',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '6px',
  marginTop: '10px',
  color: '#fff',
};

export default ExploreOfficePage;
