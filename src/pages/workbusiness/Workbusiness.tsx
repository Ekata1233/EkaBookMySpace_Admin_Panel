import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Form, Row, Col } from "react-bootstrap";

interface WorkBusiness {
  _id: string;
  title: string;
  description1: string;
  description2: string;
  imageTop: string;
  imageBottom: string;
  isDeleted: boolean;
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
  const [entries, setEntries] = useState<WorkBusiness[]>([]);
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

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      console.log("Fetched WorkBusiness data:", json);
      if (Array.isArray(json.data)) {
        setEntries(json.data);
      }
    } catch (err) {
      console.error("Error fetching WorkBusiness entries:", err);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;

    if (
      (name === "imageTop" || name === "imageBottom") &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setForm({ ...form, [name]: e.target.files[0] });
    } else {
      setForm({ ...form, [name]: e.target.value });
    }
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

    try {
      await fetch(url, {
        method,
        body: formData,
      });

      setForm({
        title: "",
        description1: "",
        description2: "",
        imageTop: null,
        imageBottom: null,
      });
      setIsEditing(false);
      setEditId(null);
      setShowForm(false);
      fetchEntries();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchEntries();
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  const handleEdit = (entry: WorkBusiness) => {
    setForm({
      title: entry.title,
      description1: entry.description1,
      description2: entry.description2,
      imageTop: null,
      imageBottom: null,
    });
    setIsEditing(true);
    setEditId(entry._id);
    setShowForm(true);
  };

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h2 style={{ color: "#6BB7BE", marginBottom: "20px" }}>Work Business</h2>

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
          {entries.length > 0 ? (
            entries
              .filter((entry) => !entry.isDeleted)
              .map((entry, index) => (
                <tr key={entry._id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{entry.title}</td>
                  <td style={tdStyle}>{entry.description1}</td>
                  <td style={tdStyle}>{entry.description2}</td>
                  <td style={tdStyle}>
                    {entry.imageTop ? (
                      <img
                        src={entry.imageTop}
                        alt="Top"
                        style={{ width: "100px", borderRadius: "6px" }}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td style={tdStyle}>
                    {entry.imageBottom ? (
                      <img
                        src={entry.imageBottom}
                        alt="Bottom"
                        style={{ width: "100px", borderRadius: "6px" }}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(entry)}
                      style={{ ...btnStyle, backgroundColor: "#6BB7BE" }}
                    >
                      Edit
                    </button>{" "}
                    <button
                      onClick={() => handleDelete(entry._id)}
                      style={{ ...btnStyle, backgroundColor: "#DC3545" }}
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
          {showForm ? "Close Form" : "Add Entry"}
        </button>
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
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
                style={inputStyle}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formDesc1">
            <Form.Label column sm={2} style={labelStyle}>
              Description 1
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                name="description1"
                placeholder="Enter description"
                rows={3}
                value={form.description1}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formDesc2">
            <Form.Label column sm={2} style={labelStyle}>
              Description 2
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                name="description2"
                placeholder="Enter description"
                rows={3}
                value={form.description2}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formImageTop">
            <Form.Label column sm={2} style={labelStyle}>
              Image Top
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="file"
                name="imageTop"
                accept="image/*"
                onChange={handleChange}
                required={!isEditing}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formImageBottom">
            <Form.Label column sm={2} style={labelStyle}>
              Image Bottom
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="file"
                name="imageBottom"
                accept="image/*"
                onChange={handleChange}
                required={!isEditing}
              />
            </Col>
          </Form.Group>

          <div style={{ textAlign: "right" }}>
            <button type="submit" style={submitButtonStyle}>
              {isEditing ? "Update" : "Add"} Entry
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

const inputStyle: React.CSSProperties = {
  height: "45px",
  width: "100%",
};

const submitButtonStyle: React.CSSProperties = {
  ...btnStyle,
  backgroundColor: "#6BB7BE",
  padding: "10px 20px",
  fontWeight: "bold",
  borderRadius: "6px",
  marginTop: "10px",
  border: "none",
};

export default WorkBusinessPage;
