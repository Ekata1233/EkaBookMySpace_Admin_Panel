// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// type BookingType = {
//   _id: string;
//   userId: string;
//   officeId: string;
//   date: string;
//   startTime: string;
//   duration: number;
//   totalPay: number;
//   createdAt: string;
//   vendorId?: string;
// };

// const BookingList: React.FC = () => {
//   const [bookings, setBookings] = useState<BookingType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get<{ success: boolean; data: BookingType[] }>(
//           'https://book-my-space-eta.vercel.app/api/book',
//         );
//         console.log('response  ', response);
//         if (response.data.success) {
//           setBookings(response.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   console.log('bookings  ', bookings);

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4 text-center">Booking Information</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <div className="table-responsive">
//           <table
//             className="table table-bordered table-hover"
//             style={{ color: '#6bb7be', borderColor: '#6bb7be' }}
//           >
//             <thead style={{ backgroundColor: '#6bb7be', color: '#fff' }}>
//               <tr>
//                 <th>User ID</th>
//                 <th>Office ID</th>
//                 <th>Date</th>
//                 <th>Start Time</th>
//                 <th>Duration (hrs)</th>
//                 <th>Total Pay</th>
//                 <th>Booking Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking._id} style={{ borderColor: '#6bb7be' }}>
//                   <td>{booking.userId}</td>
//                   <td>{booking.officeId}</td>
//                   <td>{new Date(booking.date).toLocaleDateString()}</td>
//                   <td>{booking.startTime}</td>
//                   <td>{booking.duration}</td>
//                   <td>${booking.totalPay}</td>
//                   <td>{new Date(booking.createdAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingList;
import { useEffect, useState } from 'react';

interface Vendor {
  _id: string;
  companyName: string;
  contactName: string;
  TotalEarning?: number;
  ReceivedAmount?: number;
  PendingAmount?: number;
  workEmail: string;
  phone: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingData {
  _id: string;
  userId: string;
  officeId: string;
  vendorId: string;
  date: string;
  time: string;
  startTime: string;
  duration: number;
  totalPay: number;
  status?: string;
  createdAt: string;
}

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

interface OfficeSpace {
  _id: string;
  officeSpaceName: string;
  category: string;
  city: string;
  state: string;
  pincode: string;
  description: string;
  rate: string;
  isAdminApprove: boolean;
}

interface PaymentDisplayData {
  bookingId: string;
  officeName: string;
  vendorName: string;
  userName: string;
  amountPaid: number;
  paymentDate: string;
  status: string;
  adminShare: number;
  vendorShare: number;
  commissionRate: string;
}

const API_URL = 'https://book-my-space-eta.vercel.app/api/book';
const VENDOR_API_URL = 'https://book-my-space-eta.vercel.app/api/vendor/allVendors';
const USER_API_URL = 'https://book-my-space-eta.vercel.app/api/auth/signup';
const OFFICE_SPACE_API_URL = 'https://book-my-space-eta.vercel.app/api/officeSpaces';

const BookingList = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [bookingData, setBookingData] = useState<BookingData[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [officeSpaces, setOfficeSpaces] = useState<OfficeSpace[]>([]);
  const [payments, setPayments] = useState<PaymentDisplayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [bookingsRes, vendorsRes, usersRes, officesRes] = await Promise.all([
        fetch(API_URL),
        fetch(VENDOR_API_URL),
        fetch(USER_API_URL),
        fetch(OFFICE_SPACE_API_URL),
      ]);

      if (!bookingsRes.ok) throw new Error('Failed to fetch bookings');
      if (!vendorsRes.ok) throw new Error('Failed to fetch vendors');
      if (!usersRes.ok) throw new Error('Failed to fetch users');
      if (!officesRes.ok) throw new Error('Failed to fetch office spaces');

      const [bookingsJson, vendorsJson, usersJson, officesJson] = await Promise.all([
        bookingsRes.json(),
        vendorsRes.json(),
        usersRes.json(),
        officesRes.json(),
      ]);

      setBookingData(bookingsJson.data || []);
      setVendors(vendorsJson.data || []);
      setUsers(usersJson.users || []);
      setOfficeSpaces(officesJson.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load payment data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (
      bookingData.length > 0 &&
      vendors.length > 0 &&
      users.length > 0 &&
      officeSpaces.length > 0
    ) {
      processPaymentData();
    }
  }, [bookingData, vendors, users, officeSpaces]);

  const processPaymentData = () => {
    const commissionRate = '15%';

    const processedPayments = bookingData.map((booking) => {
      const vendor = vendors.find((v) => v._id === booking.vendorId);
      const user = users.find((u) => u._id === booking.userId);
      const office = officeSpaces.find((o) => o._id === booking.officeId);

      const adminShare = booking.totalPay * 0.15;
      const vendorShare = booking.totalPay * 0.85;

      let status = 'Pending';
      if (vendor?.status === 'pending') status = 'Pending';
      if ((vendor?.ReceivedAmount || 0) > 0) status = 'Completed';
      if (booking.status === 'failed') status = 'Failed';

      return {
        bookingId: booking._id,
        officeName: office?.officeSpaceName || 'Unknown Office',
        vendorName: vendor?.contactName || vendor?.companyName || 'Unknown Vendor',
        userName: user?.name || 'Unknown User',
        amountPaid: booking.totalPay,
        paymentDate: new Date(booking.createdAt).toLocaleDateString(),
        status,
        adminShare,
        vendorShare,
        commissionRate,
      };
    });

    processedPayments.sort((a, b) => {
      return new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime();
    });
    setPayments(processedPayments);
  };

  console.log('payments : ', payments);

  if (loading) {
    return (
      <div className="container my-2">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '200px' }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-2">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-2">
      <h3 className="mb-4 fw-bold" style={{ color: '#6BB7BE' }}>
        Booking List
      </h3>
      <div className="table-responsive">
        {payments.length === 0 ? (
          <div className="alert alert-info">No payment records found</div>
        ) : (
          <table className="table table-bordered table-hover align-middle shadow-sm">
            <thead className="table-light">
              <tr style={{ color: '#6BB7BE' }}>
                <th>Booking ID</th>
                <th>Office Name</th>
                <th>Vendor</th>
                <th>User</th>
                <th>Amount</th>
                <th>Date</th>
                {/* <th>Time</th> */}
                <th>Admin Share</th>
                <th>Vendor Share</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={index}>
                  <td>{pay.bookingId.substring(0, 6)}...</td>
                  <td>{pay.officeName}</td>
                  <td>{pay.vendorName}</td>
                  <td>{pay.userName}</td>
                  <td>₹{pay.amountPaid.toLocaleString()}</td>
                  <td>{pay.paymentDate}</td>
                  {/* <td>
                    <span
                      className={`badge ${
                        pay.status === 'Completed'
                          ? 'bg-success'
                          : pay.status === 'Failed'
                          ? 'bg-danger'
                          : 'bg-warning'
                      }`}
                    >{pay.status}</span>
                  </td> */}
                  {/* <td>
                    <span
                      className={`badge ${
                        pay.status === 'Completed'
                          ? 'bg-success'
                          : pay.status === 'Failed'
                            ? 'bg-danger'
                            : 'bg-warning'
                      }`}
                    >
                      {pay.status}
                    </span>
                  </td> */}
                  <td style={{ color: '#6BB7BE' }}>₹{pay.adminShare.toLocaleString()}</td>
                  <td style={{ color: '#6BB7BE' }}>₹{pay.vendorShare.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingList;
