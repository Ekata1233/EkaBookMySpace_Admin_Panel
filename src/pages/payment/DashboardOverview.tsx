import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MdAttachMoney,
  MdOutlineTrendingUp,
  MdSend,
  MdAccountBalanceWallet,
  MdPending,
  MdBookmark,
} from "react-icons/md";

const cardStyle = {
  backgroundColor: "#f8f9fa",
  borderRadius: "12px",
  border: "1px solid #dee2e6",
  padding: "20px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  height: "100%",
};

const iconStyle = {
  fontSize: "2rem",
  color: "#6BB7BE",
  marginBottom: "10px",
};

const DashboardOverview = () => {
  const data = [
    {
      label: "Total Earnings (from Users)",
      value: "₹1,20,000",
      icon: <MdAttachMoney style={iconStyle} />,
    },
    {
      label: "Admin Commission (total earned)",
      value: "₹20,000",
      icon: <MdOutlineTrendingUp style={iconStyle} />,
    },
    {
      label: "Total Sent to Vendors",
      value: "₹90,000",
      icon: <MdSend style={iconStyle} />,
    },
    {
      label: "Total Withdrawals (by Vendors)",
      value: "₹70,000",
      icon: <MdAccountBalanceWallet style={iconStyle} />,
    },
    {
      label: "Pending Vendor Payouts",
      value: "₹20,000",
      icon: <MdPending style={iconStyle} />,
    },
    {
      label: "Total Bookings (All Vendors)",
      value: "145",
      icon: <MdBookmark style={iconStyle} />,
    },
  ];

  return (
    <div className="container my-2">
      <h3 className="mb-4 fw-bold" style={{ color: "#6BB7BE" }}>
        🧾 Dashboard Overview
      </h3>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {data.map((item, index) => (
          <div key={index} className="col">
            <div style={cardStyle} className="text-center p-3 h-100">
              <div>{item.icon}</div>
              <h6 className="text-muted">{item.label}</h6>
              <h4 style={{ color: "#6BB7BE", fontWeight: "bold" }}>
                {item.value}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
