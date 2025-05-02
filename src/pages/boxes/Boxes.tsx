import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; // ✅ This was missing

interface Box {
  _id: string;
  icon: string;
  link: string;
  text: string;
  description: string;
  isDeleted: boolean;
}

interface BoxForm {
  icon: string;
  link: string;
  text: string;
  description: string;
}

const API_URL = 'https://book-my-space-eta.vercel.app/api/boxes';

const Boxes: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [form, setForm] = useState<BoxForm>({
    icon: '',
    link: '',
    text: '',
    description: '',
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchBoxes = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      console.log('Fetched Boxes:', json);

      if (Array.isArray(json.data)) {
        setBoxes(json.data);
      } else {
        console.error('Invalid data format:', json);
      }
    } catch (err) {
      console.error('Error fetching boxes:', err);
    }
  };

  useEffect(() => {
    fetchBoxes();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/${editId}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setForm({
      icon: '',
      link: '',
      text: '',
      description: '',
    });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
    fetchBoxes();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchBoxes();
  };

  const handleEdit = (box: Box) => {
    setForm({
      icon: box.icon,
      link: box.link,
      text: box.text,
      description: box.description,
    });
    setIsEditing(true);
    setEditId(box._id);
    setShowForm(true);
  };

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h2 style={{ color: '#6BB7BE', marginBottom: '20px' }}>Boxes Management</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#6BB7BE', color: '#fff' }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Icon</th>
            <th style={thStyle}>Link</th>
            <th style={thStyle}>Text</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {boxes.length > 0 ? (
            boxes
              .filter((box) => !box.isDeleted)
              .map((box, index) => (
                <tr key={box._id} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{box.icon}</td>
                  <td style={tdStyle}>{box.link}</td>
                  <td style={tdStyle}>{box.text}</td>
                  <td style={tdStyle}>{box.description}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(box)}
                      style={{ ...btnStyle, backgroundColor: '#6BB7BE' }}
                    >
                      Edit
                    </button>{' '}
                    <button
                      onClick={() => handleDelete(box._id)}
                      style={{ ...btnStyle, backgroundColor: '#DC3545' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                No boxes found.
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
          {showForm ? 'Close Form' : 'Add Data'}
        </button>
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <Form.Group as={Row} className="mb-4" controlId="formIcon">
            <Form.Label
              className=""
              column
              sm={2}
              style={{ fontWeight: 'bold', marginTop: '10px', display: 'block' }}
            >
              Icon
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="icon"
                placeholder="Enter icon"
                value={form.icon}
                onChange={handleChange}
                required
                style={{ height: '45px', width: '100%' }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formLink">
            <Form.Label
              className=""
              column
              sm={2}
              style={{ fontWeight: 'bold', marginTop: '10px', display: 'block' }}
            >
              Link
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="link"
                placeholder="Enter link"
                value={form.link}
                onChange={handleChange}
                required
                style={{ height: '45px', width: '100%' }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formText">
            <Form.Label
              className=""
              column
              sm={2}
              style={{ fontWeight: 'bold', marginTop: '10px', display: 'block' }}
            >
              Text
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="text"
                placeholder="Enter text"
                value={form.text}
                className="w-100"
                onChange={handleChange}
                required
                style={{ height: '45px', width: '100%' }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formDescription">
            <Form.Label
              className=""
              column
              sm={2}
              style={{ fontWeight: 'bold', marginTop: '10px', display: 'block' }}
            >
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                name="description"
                rows={4}
                placeholder="Enter description"
                value={form.description}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </Col>
          </Form.Group>

          <div style={{ textAlign: 'right' }}>
            <button
              type="submit"
              style={{
                ...btnStyle,
                backgroundColor: '#6BB7BE',
                padding: '10px 20px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '6px',
                marginTop: '10px',
                color: '#fff',
              }}
            >
              {isEditing ? 'Update' : 'Add'} Box
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

export default Boxes;
