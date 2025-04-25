// src/pages/payment/PaymentManagement.tsx
import React from "react";

const PaymentManagement = () => {
  const payments = [
    {
      bookingId: "BK-1001",
      officeName: "Downtown Co-Work",
      vendorName: "John Doe",
      userName: "Aniket Patil",
      amountPaid: 5000,
      paymentDate: "2025-04-20",
      status: "Completed",
      adminShare: 500,
      vendorShare: 4500,
      commissionRate: "10%",
    },
    {
      bookingId: "BK-1002",
      officeName: "TechHub Space",
      vendorName: "Priya Shah",
      userName: "Kunal Mehta",
      amountPaid: 10000,
      paymentDate: "2025-04-22",
      status: "Failed",
      adminShare: 1000,
      vendorShare: 9000,
      commissionRate: "10%",
    },
  ];

  return (
    <div className="container my-2">
      <h3 className="mb-4 fw-bold" style={{ color: "#6BB7BE" }}>
        💳 Payment Management
      </h3>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle shadow-sm">
          <thead className="table-light">
            <tr style={{ color: "#6BB7BE" }}>
              <th>Booking ID</th>
              <th>Office Name</th>
              <th>Vendor Name</th>
              <th>User Name</th>
              <th>Amount Paid</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Admin Share</th>
              <th>Vendor Share</th>
              <th>Commission %</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, index) => (
              <tr key={index}>
                <td>{pay.bookingId}</td>
                <td>{pay.officeName}</td>
                <td>{pay.vendorName}</td>
                <td>{pay.userName}</td>
                <td>₹{pay.amountPaid}</td>
                <td>{pay.paymentDate}</td>
                <td>
                  <span
                    className={`badge ${pay.status === "Completed" ? "bg-success" : "bg-danger"}`}
                  >
                    {pay.status}
                  </span>
                </td>
                <td style={{ color: "#6BB7BE" }}>₹{pay.adminShare}</td>
                <td style={{ color: "#6BB7BE" }}>₹{pay.vendorShare}</td>
                <td>{pay.commissionRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;
