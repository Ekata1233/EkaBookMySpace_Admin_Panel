'use client';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface WorkBusiness {
  _id: string;
  title: string;
  description1: string;
  description2: string;
  imageTop: string;
  imageBottom: string;
}

interface WorkBusinessForm {
  title: string;
  description1: string;
  description2: string;
  imageTop: File | null;
  imageBottom: File | null;
}

const API_URL = "https://book-my-space-eta.vercel.app/api/workbusiness";

const WorkBusinessPage: React.FC = () => {
  const [data, setData] = useState<WorkBusiness[]>([]);
  const [form, setForm] = useState<WorkBusinessForm>({
    title: "",
    description1: "",
    description2: "",
    imageTop: null,
    imageBottom: null,
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  console.log('use state data', data);
  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      console.log('Parsed JSON:', json);

      if (Array.isArray(json)) {
        setData(json); // ✅ Use json directly since it's the array
      } else {
        console.error('Expected array but got:', json);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Updated data:', data);
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files?.[0] || null;
    setForm((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description1", form.description1);
    formData.append("description2", form.description2);
    if (form.imageTop) formData.append("imageTop", form.imageTop);
    if (form.imageBottom) formData.append("imageBottom", form.imageBottom);

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${editId}` : API_URL;

    await fetch(url, { method, body: formData });

    setForm({
      title: '',
      description1: '',
      description2: '',
      imageTop: null,
      imageBottom: null,
    });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (item: WorkBusiness) => {
    setForm({
      title: item.title,
      description1: item.description1,
      description2: item.description2,
      imageTop: null,
      imageBottom: null,
    });
    setIsEditing(true);
    setEditId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h2 style={{ color: '#6BB7BE', marginBottom: '20px' }}>Work Business Management</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#6BB7BE", color: "#fff" }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Description 1</th>
            <th style={thStyle}>Description 2</th>
            <th style={thStyle}>Image Top</th>
            <th style={thStyle}>Image Bottom</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tdStyle}>{index + 1}</td>
                <td
                  style={{
                    ...tdStyle,
                    width: '150px',
                    whiteSpace: 'wrap',
                  }}
                >
                  {item.title}
                </td>
                <td
                  style={{
                    ...tdStyle,
                    width: '250px',
                    whiteSpace: 'wrap',
                  }}
                >
                  {item.description1}
                </td>
                <td
                  style={{
                    ...tdStyle,
                    width: '300px',
                    whiteSpace: 'wrap',
                  }}
                >
                  {item.description2}
                </td>
                <td style={tdStyle}>
                  <img src={item.imageTop} alt="top" width="80" />
                </td>
                <td style={tdStyle}>
                  <img src={item.imageBottom} alt="bottom" width="80" />
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{ ...btnStyle, backgroundColor: '#6BB7BE' }}
                  >
                    Edit
                  </button>{' '}
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ ...btnStyle, backgroundColor: '#DC3545' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                No entries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ ...btnStyle, backgroundColor: "#6BB7BE" }}
        >
          {showForm ? 'Close Form' : 'Add WorkBusiness'}
        </button>
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          {/* Title */}
          <Form.Group as={Row} className="mb-4" controlId="formTitle">
            <Form.Label column sm={2} style={labelStyle}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                value={form.title}
                onChange={handleChange}
                required
                style={{ height: '45px', width: '100%' }}
              />
            </Col>
          </Form.Group>

          {/* Description 1 */}
          <Form.Group as={Row} className="mb-4" controlId="formDescription1">
            <Form.Label column sm={2} style={labelStyle}>
              Description 1
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                name="description1"
                placeholder="Enter first description"
                value={form.description1}
                onChange={handleChange}
                rows={3}
                required
                style={{ height: '45px', width: '100%' }}
              />
            </Col>
          </Form.Group>

          {/* Description 2 */}
          <Form.Group as={Row} className="mb-4" controlId="formDescription2">
            <Form.Label column sm={2} style={labelStyle}>
              Description 2
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                name="description2"
                placeholder="Enter second description"
                value={form.description2}
                onChange={handleChange}
                rows={3}
                required
                style={{ height: '45px', width: '100%' }}
              />
            </Col>
          </Form.Group>

          {/* Image Top */}
          <Form.Group as={Row} className="mb-4" controlId="formImageTop">
            <Form.Label column sm={2} style={labelStyle}>
              Image Top
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="file"
                name="imageTop"
                accept="image/*"
                onChange={handleFileChange}
                required={!isEditing}
              />
            </Col>
          </Form.Group>

          {/* Image Bottom */}
          <Form.Group as={Row} className="mb-4" controlId="formImageBottom">
            <Form.Label column sm={2} style={labelStyle}>
              Image Bottom
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="file"
                name="imageBottom"
                accept="image/*"
                onChange={handleFileChange}
                required={!isEditing}
              />
            </Col>
          </Form.Group>

          {/* Submit Button */}
          <div style={{ textAlign: 'right' }}>
            <button type="submit" style={submitStyle}>
              {isEditing ? 'Update' : 'Add'} WorkBusiness
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  verticalAlign: "top",
};

const btnStyle: React.CSSProperties = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
  color: "#fff",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  fontWeight: "bold",
  marginTop: "10px",
  display: "block",
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

export default WorkBusinessPage;
