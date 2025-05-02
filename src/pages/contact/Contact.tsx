import React, { useEffect, useState } from 'react';
import axios from 'axios';

type ContactType = {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone: string;
  requirement: string;
  inquiry: string;
  createdAt: string;
};

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: ContactType[] }>(
          'https://book-my-space-eta.vercel.app/api/contact',
        );
        console.log('response  ', response);
        if (response.data.success) {
          setContacts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);
  console.log('contacts  ', contacts);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold" style={{ color: '#6BB7BE' }}>
        Contact List
      </h3>

      {loading ? (
        <p>Loading...</p>
      ) : contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <div className="table-responsive">
          <table
            className="table table-bordered table-hover"
            style={{ color: '#6bb7be', borderColor: '#6bb7be' }}
          >
            <thead style={{ backgroundColor: '#6bb7be', color: '#fff' }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Phone</th>
                <th>Requirement</th>
                <th>Inquiry</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} style={{ borderColor: '#6bb7be' }}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.company || '-'}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.requirement}</td>
                  <td>{contact.inquiry}</td>
                  <td>{new Date(contact.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactList;
