import React, { useEffect, useState } from 'react';
import PayoutToVendor from './PayoutToVendor/PayoutToVendor';
import CompletedPayouts from './CompletedPayouts/CompletedPayouts';

const API_URL = 'https://book-my-space-eta.vercel.app/api/book';
const SECOND_API_URL = 'https://book-my-space-eta.vercel.app/api/vendor/allVendors';
// const THIRD_API_URL = 'https://book-my-space-eta.vercel.app/api/payout';

export interface RazorpayData {
  userId: string;
  officeId: string;
  date: string;
  startTime: string;
  duration: number;
  totalPay: number;
  vendorId: string; // Added vendorId to match the reference in your code
}

export interface IVendor {
  _id: string; // Added _id to match the reference in your code
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
  documentNo: number;
  documentImage: string;
  password: string;
  agreed: boolean;
  userId?: string;
  paid?: boolean;
  order_id?: string;
  amount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const VendorPayoutManagement = () => {
  const [razorpayData, setRazorpayData] = useState<RazorpayData[]>([]);
  const [vendors, setVendors] = useState<IVendor[]>([]);

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
      console.error('Error fetching boxes:', err);
    }
  };

  useEffect(() => {
    fetchVendors();
    fetchrazorpayData();
  }, []);

  console.log('Fetched vendors:', vendors);
  console.log('Fetched bookings:', razorpayData);

  // const [manualPayout, setManualPayout] = useState({
  //   vendor: '',
  //   amount: '',
  //   bookingId: '',
  //   mode: 'UPI',
  //   reference: '',
  // });

  return (
    <div className="container my-2">
      <h3 className="fw-bold mb-4" style={{ color: '#6BB7BE' }}>
        💸 Vendor Payout Management
      </h3>

      {/* Pending Withdrawals */}
      <h5 className="text-secondary mb-3">Pending Withdrawals</h5>
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-light" style={{ color: '#6BB7BE' }}>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Booking Count</th>
            <th>Total Pay (₹)</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor, index) => {
            const vendorBookings = razorpayData.filter((entry) => entry.vendorId === vendor._id);
            const totalPay = vendorBookings.reduce((acc, entry) => acc + (entry.totalPay || 0), 0);
            const totalPayAfterCommision = totalPay - totalPay * 0.15;

            return (
              <tr key={vendor._id}>
                <td>{index + 1}</td>
                <td>{vendor.companyName}</td>
                <td>{vendor.workEmail}</td>
                <td>{vendorBookings.length}</td>
                <td>₹{totalPayAfterCommision}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <PayoutToVendor />

      {/* Completed Payments */}
      <CompletedPayouts />
    </div>
  );
};

export default VendorPayoutManagement;
