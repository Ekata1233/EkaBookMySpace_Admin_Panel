import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for the payout object
interface Payout {
  vendorName: string;
  amountPaid: number;
  commission: number;
  date: string;
  method: string;
  reference: string;
  status: string;
  notes: string[];
  fees: number;
  tax: number;
}

// Define the response type for the API
interface PayoutResponse {
  data: {
    amount: number;
    createdAt: string;
    notes: string;
    paidAt: string;
    paymentMethod: string;
    razorpayResponse: object;
    razorpayStatus: string;
    transactionId: string;
    updatedAt: string;
    vendor: string;
    _id: string;
  }[];
  success: boolean;
}

const API_URL = 'https://book-my-space-eta.vercel.app/api/payout';

const CompletedPayouts = () => {
  const [completedPayments, setCompletedPayments] = useState<Payout[]>([]);

  useEffect(() => {
    const fetchCompletedPayouts = async () => {
      try {
        const response = await axios.get<PayoutResponse>(API_URL);

        console.log('response of payments : ', response);

        const filtered = response.data.data.filter((payout) => {
          return payout.razorpayStatus === 'processing' || payout.razorpayStatus === 'processed';
        });

        // Format the filtered data
        const formatted = filtered.map((payout) => ({
          vendorName: payout.notes || 'N/A', // Assuming notes contains the vendor name
          amountPaid: payout.amount, // Assuming the amount is in paise
          commission: 0, // Assuming commission and fees are not included in the data
          date: new Date(payout.paidAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          method: payout.paymentMethod,
          reference: payout.transactionId,
          status: payout.razorpayStatus, // You can include the status if needed
          notes: payout.notes ? [payout.notes] : [], // Adding notes as an array
          fees: 0, // Assuming fees are not included in the data
          tax: 0, // Assuming tax is not included in the data
        }));

        setCompletedPayments(formatted);
      } catch (error) {
        console.error('Error fetching payouts:', error);
      }
    };

    fetchCompletedPayouts();
  }, []);

  return (
    <div className="px-3">
      <h5 className="text-secondary mb-3">Completed Payouts</h5>
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-light" style={{ color: '#6BB7BE' }}>
          <tr>
            <th>Vendor Name</th>
            <th>Amount Paid</th>
            <th>Date</th>
            <th>Payment Method</th>
            <th>Reference ID</th>
          </tr>
        </thead>
        <tbody>
          {completedPayments.length > 0 ? (
            completedPayments.map((p, i) => (
              <tr key={i}>
                <td>{p.vendorName}</td>
                <td>₹{p.amountPaid}</td>
                <td>{p.date}</td>
                <td>{p.method}</td>
                <td>{p.reference}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No completed payouts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedPayouts;
