// src/components/admin/VendorPayoutManagement.jsx
import React, { useState } from "react";

const VendorPayoutManagement = () => {
  const [manualPayout, setManualPayout] = useState({
    vendor: "",
    amount: "",
    bookingId: "",
    mode: "UPI",
    reference: "",
  });

  const pendingWithdrawals = [
    {
      vendorName: "John Doe",
      earnings: 12000,
      completedBookings: 18,
      requestDate: "2025-04-21",
    },
    {
      vendorName: "Aarav Singh",
      earnings: 8000,
      completedBookings: 10,
      requestDate: "2025-04-23",
    },
  ];

  const completedPayments = [
    {
      vendorName: "Riya Mehta",
      amountPaid: 7000,
      commission: 1000,
      date: "2025-04-22",
      method: "Bank",
      reference: "TXN102983",
    },
    {
      vendorName: "Arjun Patel",
      amountPaid: 5000,
      commission: 500,
      date: "2025-04-20",
      method: "UPI",
      reference: "UPI947372",
    },
  ];

  return (
    <div className="container my-2">
      <h3 className="fw-bold mb-4" style={{ color: "#6BB7BE" }}>
        💸 Vendor Payout Management
      </h3>

      {/* Pending Withdrawals */}
      <h5 className="text-secondary mb-3">📤 Pending Withdrawals</h5>
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-light" style={{ color: "#6BB7BE" }}>
          <tr>
            <th>Vendor Name</th>
            <th>Total Earnings</th>
            <th>Completed Bookings</th>
            <th>Request Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingWithdrawals.map((v, i) => (
            <tr key={i}>
              <td>{v.vendorName}</td>
              <td>₹{v.earnings}</td>
              <td>{v.completedBookings}</td>
              <td>{v.requestDate}</td>
              <td>
                <button className="btn btn-sm me-2">✅ Approve & Send</button>
                <button className="btn btn-sm btn-outline-danger">
                  ❌ Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Manual Payout */}
      <h5 className="text-secondary mt-5 mb-3">🛠️ Manual Payout to Vendor</h5>
      <div className="card shadow-sm p-4 mb-5">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Vendor Name"
              value={manualPayout.vendor}
              onChange={(e) =>
                setManualPayout({ ...manualPayout, vendor: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Amount (₹)"
              value={manualPayout.amount}
              onChange={(e) =>
                setManualPayout({ ...manualPayout, amount: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Associated Booking ID"
              value={manualPayout.bookingId}
              onChange={(e) =>
                setManualPayout({ ...manualPayout, bookingId: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={manualPayout.mode}
              onChange={(e) =>
                setManualPayout({ ...manualPayout, mode: e.target.value })
              }
            >
              <option>UPI</option>
              <option>Bank</option>
              <option>Wallet</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Reference/Txn ID"
              value={manualPayout.reference}
              onChange={(e) =>
                setManualPayout({ ...manualPayout, reference: e.target.value })
              }
            />
          </div>
        </div>
        <div className="text-end mt-3">
          <button
            className="btn"
            style={{ backgroundColor: "#6BB7BE", color: "#fff" }}
          >
            💰 Send Payment
          </button>
        </div>
      </div>

      {/* Completed Payments */}
      <h5 className="text-secondary mb-3">✅ Completed Payouts</h5>
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-light" style={{ color: "#6BB7BE" }}>
          <tr>
            <th>Vendor Name</th>
            <th>Amount Paid</th>
            <th>Commission Cut</th>
            <th>Date</th>
            <th>Payment Method</th>
            <th>Reference ID</th>
          </tr>
        </thead>
        <tbody>
          {completedPayments.map((p, i) => (
            <tr key={i}>
              <td>{p.vendorName}</td>
              <td>₹{p.amountPaid}</td>
              <td>₹{p.commission}</td>
              <td>{p.date}</td>
              <td>{p.method}</td>
              <td>{p.reference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorPayoutManagement;
