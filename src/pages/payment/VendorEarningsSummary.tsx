import { useEffect, useState } from 'react';

export interface IVendor {
  companyName: string;
  workEmail: string;
  phone: string;
  website?: string;
  businessType: 'Individual' | 'Company';
  address: string;
  message?: string;
  logo: string;
  contactName: string;
  contactMobile: number;
  contactEmail: string;
  documentType: 'GST' | 'License' | 'Other';
  documentNo: number | string;
  documentImage: string;
  password?: string;
  agreed: boolean;
  userId?: string;
  paid?: boolean;
  order_id?: string;
  amount?: number;
  TotalEarning: number;
  ReceivedAmount: number;
  PendingAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const API_URL = 'https://book-my-space-eta.vercel.app/api/vendor/allVendors';

const VendorEarningsSummary = () => {
  const [vendors, setVendors] = useState<IVendor[]>([]);

  const fetchVendors = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();

      if (Array.isArray(json.data)) {
        setVendors(json.data);
      } else {
        console.error('Invalid data format:', json);
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="container my-2">
      <h3 className="fw-bold mb-4" style={{ color: '#6BB7BE' }}>
        📊 Vendor Earnings Summary
      </h3>

      <div className="row g-4">
        {vendors.map((vendor, index) => {
          const commission = vendor.TotalEarning * 0.15;
          const totalEarnings = vendor.TotalEarning - commission;
          const withdrawn = vendor.ReceivedAmount;
          const currentBalance = vendor.ReceivedAmount;
          const pendingAmount = totalEarnings - withdrawn;

          return (
            <div className="col-md-4" key={index}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold" style={{ color: '#6BB7BE' }}>
                    {vendor.companyName} ({vendor.contactName})
                  </h5>
                  <ul className="list-group list-group-flush mt-3">
                    <li className="list-group-item">
                      <strong>Total Booking Earnings:</strong> ₹{totalEarnings.toFixed(2)}
                    </li>
                    <li className="list-group-item">
                      <strong>Commission to Admin:</strong> ₹{commission.toFixed(2)}
                    </li>
                    <li className="list-group-item">
                      <strong>Total Send:</strong> ₹{withdrawn.toFixed(2)}
                    </li>
                    <li className="list-group-item">
                      <strong>Current Balance:</strong>{' '}
                      <span className="fw-bold text-success">₹{currentBalance.toFixed(2)}</span>
                    </li>
                    <li className="list-group-item">
                      <strong>Pending Amount:</strong>{' '}
                      <span className="badge bg-warning text-dark">
                        ₹{pendingAmount.toFixed(2)}
                      </span>
                    </li>
                  </ul>
                </div>
                {/* <div className="card-footer text-end" style={{ backgroundColor: '#6BB7BE' }}>
                  <button className="btn btn-sm btn-light">View Details</button>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VendorEarningsSummary;
