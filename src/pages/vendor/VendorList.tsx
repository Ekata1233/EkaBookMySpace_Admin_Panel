'use client';
import React, { useEffect, useState } from 'react';

interface IVendor {
  _id: string;
  contactName: string;
  contactEmail: string;
  contactMobile: string;
  address: string;
  businessType: string;
  documentImage: string;
  documentNo: string;
  website: string;
  workEmail: string;
}

const API_URL = 'https://book-my-space-eta.vercel.app/api/vendor/allVendors';

const VendorList: React.FC = () => {
  const [vendors, setVendors] = useState<IVendor[]>([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (Array.isArray(json.data)) {
        setVendors(json.data);
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchVendors();
    } catch (err) {
      console.error('Error deleting vendor:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#6BB7BE', marginBottom: '20px' }}>All Vendors</h2>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {vendors.map((vendor) => (
          <div
            key={vendor._id}
            style={{
              flex: '1 1 calc(50% - 20px)',
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
            }}
          >
            <p>
              <strong>Contact Name:</strong> {vendor.contactName}
            </p>
            <p>
              <strong>Contact Email:</strong> {vendor.contactEmail}
            </p>
            <p>
              <strong>Contact Mobile:</strong> {vendor.contactMobile}
            </p>
            <p>
              <strong>Address:</strong> {vendor.address}
            </p>
            <p>
              <strong>Business Type:</strong> {vendor.businessType}
            </p>
            <p>
              <strong>Document No:</strong> {vendor.documentNo}
            </p>
            <p>
              <strong>Work Email:</strong> {vendor.workEmail}
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a href={vendor.website} target="_blank" rel="noopener noreferrer">
                {vendor.website}
              </a>
            </p>
            {vendor.documentImage && (
              <div style={{ margin: '10px 0' }}>
                <strong>Document Image:</strong>
                <img
                  src={vendor.documentImage}
                  alt="Document"
                  style={{
                    width: '100%',
                    maxHeight: '180px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginTop: '8px',
                  }}
                />
              </div>
            )}
            <button
              onClick={() => handleDelete(vendor._id)}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: '#DC3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorList;
