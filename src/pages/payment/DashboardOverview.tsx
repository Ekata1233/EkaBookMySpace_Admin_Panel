import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MdAttachMoney,
  MdOutlineTrendingUp,
  MdSend,
  MdAccountBalanceWallet,
  MdPending,
  MdBookmark,
} from 'react-icons/md';

const cardStyle = {
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  border: '1px solid #dee2e6',
  padding: '20px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  height: '100%',
};

const iconStyle = {
  fontSize: '2rem',
  color: '#6BB7BE',
  marginBottom: '10px',
};

export interface RazorpayData {
  userId: string;
  officeId: string;
  date: string;
  startTime: string;
  duration: number;
  totalPay: number;
}

interface Vendor {
  _id: string;
  companyName: string;
  workEmail: string;
  upiId: string;
  phone: string;
  website: string;
  address: string;
  agreed: boolean;
  amount: number;
  businessType: string;
  contactEmail: string;
  contactMobile: string;
  contactName: string;
  createdAt: string;
  documentImage: string;
  documentNo: number;
  documentType: string;
  logo: string;
  message: string;
  paid: boolean;
  status: string;
  updatedAt: string;
  TotalEarning: number;
  ReceivedAmount: number;
  PendingAmount: number;
}

const API_URL = 'https://book-my-space-eta.vercel.app/api/book';
const SECOND_API_URL = 'https://book-my-space-eta.vercel.app/api/vendor/allVendors';

const DashboardOverview = () => {
  const [razorpayData, setRazorpayData] = useState<RazorpayData[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const fetchrazorpayData = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();

      if (Array.isArray(json.data)) {
        setRazorpayData(json.data);
      } else {
        console.error('Invalid data format:', json);
      }
    } catch (err) {
      console.error('Error fetching boxes:', err);
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await fetch(SECOND_API_URL);
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
    fetchrazorpayData();
    fetchVendors();
  }, []);

  const totalEarnings = razorpayData.reduce((sum, item) => sum + (item.totalPay || 0), 0);
  const totalSentToVendors = vendors.reduce((sum, vendor) => sum + (vendor.ReceivedAmount || 0), 0);
  const totalEarningsFromVendors = vendors.reduce(
    (sum, vendor) => sum + (vendor.TotalEarning || 0),
    0,
  );
  const pendingVendorPayouts = totalEarningsFromVendors - totalSentToVendors;
  const totalBookings = razorpayData.length;
  const totalCommission = totalEarnings * 0.15;
  const totalEarningOfVendor = totalEarnings - totalCommission;

  const data = [
    {
      label: 'Total Earnings (from Users)',
      value: `₹${totalEarnings.toLocaleString()}`,
      icon: <MdAttachMoney style={iconStyle} />,
    },
    {
      label: 'Admin Commission (total earned)',
      value: `₹${totalCommission.toLocaleString()}`,
      icon: <MdOutlineTrendingUp style={iconStyle} />,
    },
    {
      label: 'Total Earnings of Vendor',
      value: `₹${totalEarningOfVendor.toLocaleString()}`,
      icon: <MdAccountBalanceWallet style={iconStyle} />,
    },
    {
      label: 'Total Sent to Vendors',
      value: `₹${totalSentToVendors.toLocaleString()}`,
      icon: <MdSend style={iconStyle} />,
    },
    {
      label: 'Pending Vendor Payouts',
      value: `₹${pendingVendorPayouts.toLocaleString()}`,
      icon: <MdPending style={iconStyle} />,
    },
    {
      label: 'Total Bookings (All Vendors)',
      value: `${totalBookings}`,
      icon: <MdBookmark style={iconStyle} />,
    },
  ];

  return (
    <div className="container my-2">
      <h3 className="mb-4 fw-bold" style={{ color: '#6BB7BE' }}>
        🧾 Dashboard Overview
      </h3>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {data.map((item, index) => (
          <div key={index} className="col">
            <div style={cardStyle} className="text-center p-3 h-100">
              <div>{item.icon}</div>
              <h6 className="text-muted">{item.label}</h6>
              <h4 style={{ color: '#6BB7BE', fontWeight: 'bold' }}>{item.value}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
