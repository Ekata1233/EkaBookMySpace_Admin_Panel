import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Form, Row, Col } from "react-bootstrap";
interface OfficeTour {
  _id: string;
  title: string;
  description: string;
  image: string;
  isDeleted: boolean;
}

interface OfficeTourForm {
  title: string;
  description: string;
  image: File | null;
}

const API_URL = "https://book-my-space-eta.vercel.app/api/office-tours";

const OfficeTourPage: React.FC = () => {
  const [officeTours, setOfficeTours] = useState<OfficeTour[]>([]);
  const [form, setForm] = useState<OfficeTourForm>({
    title: "",
    description: "",
    image: null,
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchOfficeTours();
  }, []);

  const fetchOfficeTours = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (Array.isArray(json.data)) {
        setOfficeTours(json.data);
      }
    } catch (err) {
      console.error("Error fetching office tours:", err);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;

    if (
      name === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image) {
      formData.append("image", form.image);
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${editId}` : API_URL;

    try {
      await fetch(url, {
        method,
        body: formData,
      });

      // Reset
      setForm({ title: "", description: "", image: null });
      setIsEditing(false);
      setEditId(null);
      setShowForm(false);
      fetchOfficeTours();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchOfficeTours();
    } catch (err) {
      console.error("Error deleting tour:", err);
    }
  };

  const handleEdit = (tour: OfficeTour) => {
    setForm({
      title: tour.title,
      description: tour.description,
      image: null,
    });
    setIsEditing(true);
    setEditId(tour._id);
    setShowForm(true);
  };

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h2 style={{ color: "#6BB7BE", marginBottom: "20px" }}>Office Tours</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#6BB7BE", color: "#fff" }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Image</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {officeTours.length > 0 ? (
            officeTours
              .filter((tour) => !tour.isDeleted)
              .map((tour, index) => (
                <tr key={tour._id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{tour.title}</td>
                  <td
                    style={{
                      ...tdStyle,
                      width: '400px',
                      whiteSpace: 'wrap',
                    }}
                  >
                    {tour.description}
                  </td>
                  <td style={tdStyle}>
                    {tour.image ? (
                      <img
                        src={tour.image}
                        alt={tour.title}
                        style={{ width: "100px", borderRadius: "6px" }}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(tour)}
                      style={{ ...btnStyle, backgroundColor: "#6BB7BE" }}
                    >
                      Edit
                    </button>{" "}
                    <button
                      onClick={() => handleDelete(tour._id)}
                      style={{ ...btnStyle, backgroundColor: "#DC3545" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                No office tours found.
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
          {showForm ? "Close Form" : "Add Office Tour"}
        </button>
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <Form.Group as={Row} className="mb-4" controlId="formTitle">
            <Form.Label
              column
              sm={2}
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                display: "block",
              }}
            >
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
                style={{ height: "45px", width: "100%" }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formDescription">
            <Form.Label
              column
              sm={2}
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                display: "block",
              }}
            >
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Enter description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formImage">
            <Form.Label
              column
              sm={2}
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                display: "block",
              }}
            >
              Image
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required={!isEditing}
                style={{ height: "45px", width: "100%" }}
              />
            </Col>
          </Form.Group>

          <div style={{ textAlign: "right" }}>
            <button
              type="submit"
              style={{
                ...btnStyle,
                backgroundColor: "#6BB7BE",
                padding: "10px 20px",
                fontWeight: "bold",
                borderRadius: "6px",
                marginTop: "10px",
                border: "none",
                color: "#fff",
              }}
            >
              {isEditing ? "Update" : "Add"} Office Tour
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

export default OfficeTourPage;
