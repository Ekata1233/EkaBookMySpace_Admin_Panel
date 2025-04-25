// src/components/admin/VendorEarningsSummary.jsx

const VendorEarningsSummary = () => {
  const API_URL = "https://book-my-space-eta.vercel.app/api/boxes";
  console.log(`'data·:·'`, API_URL);
  const vendorData = [
    {
      vendorName: "John Doe",
      totalEarnings: 15000,
      commissionPaid: 3000,
      withdrawn: 10000,
      currentBalance: 2000,
      activeListings: 3,
    },
    {
      vendorName: "Riya Sharma",
      totalEarnings: 18000,
      commissionPaid: 2500,
      withdrawn: 12000,
      currentBalance: 3500,
      activeListings: 5,
    },
    {
      vendorName: "Amit Kumar",
      totalEarnings: 12000,
      commissionPaid: 1500,
      withdrawn: 8000,
      currentBalance: 2500,
      activeListings: 2,
    },
  ];

  return (
    <div className="container my-2">
      <h3 className="fw-bold mb-4" style={{ color: "#6BB7BE" }}>
        📊 Vendor Earnings Summary
      </h3>

      <div className="row g-4">
        {vendorData.map((vendor, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold" style={{ color: "#6BB7BE" }}>
                  🧑 {vendor.vendorName}
                </h5>
                <ul className="list-group list-group-flush mt-3">
                  <li className="list-group-item">
                    <strong>Total Booking Earnings:</strong> ₹
                    {vendor.totalEarnings}
                  </li>
                  <li className="list-group-item">
                    <strong>Commission to Admin:</strong> ₹
                    {vendor.commissionPaid}
                  </li>
                  <li className="list-group-item">
                    <strong>Total Withdrawn:</strong> ₹{vendor.withdrawn}
                  </li>
                  <li className="list-group-item">
                    <strong>Current Balance:</strong>{" "}
                    <span className="fw-bold text-success">
                      ₹{vendor.currentBalance}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <strong>Active Listings:</strong>{" "}
                    <span className="badge bg-secondary">
                      {vendor.activeListings}
                    </span>
                  </li>
                </ul>
              </div>
              <div
                className="card-footer text-end"
                style={{ backgroundColor: "#6BB7BE" }}
              >
                <button className="btn btn-sm btn-light">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorEarningsSummary;
