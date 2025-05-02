import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

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
}

interface VendorBankDetails {
  _id: string;
  vendorId: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
  branchName?: string;
  accountType: 'Savings' | 'Current';
  phone?: string;
  upiId?: string;
  bankProof?: string;
  verification: 'Pending' | 'Verified' | 'Rejected';
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Payout {
  vendor: string;
  amount: number;
  paymentMethod: 'bank_transfer' | 'upi';
  transactionId: string;
  razorpayStatus?: 'pending' | 'processing' | 'processed' | 'reversed' | 'failed';
  notes?: string;
  paidAt: Date;
  createdByAdmin?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const API_URL = 'https://book-my-space-eta.vercel.app/api/vendor/bankDetails';
const SECOND_API_URL = 'https://book-my-space-eta.vercel.app/api/vendor/allVendors';
const THIRD_API_URL = 'https://book-my-space-eta.vercel.app/api/payout';

const PayoutToVendor: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [bankDetails, setBankDetails] = useState<VendorBankDetails[]>([]);
  const [payoutDetails, setPayoutDetails] = useState<Payout[]>([]);
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [formData, setFormData] = useState<Partial<Vendor>>({});
  const [message, setMessage] = useState<string>('');

  console.log('vendor : ', vendors);
  console.log('bank details : ', bankDetails);
  console.log('payout details : ', payoutDetails);
  console.log('payout formData : ', formData);

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

  const fetchBankDetails = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();

      if (Array.isArray(json.data)) {
        setBankDetails(json.data);
      } else {
        console.error('Invalid data format:', json);
      }
    } catch (err) {
      console.error('Error fetching bank details:', err);
    }
  };

  const fetchPayoutDetails = async () => {
    try {
      const res = await fetch(THIRD_API_URL);
      const json = await res.json();

      if (Array.isArray(json.data)) {
        setPayoutDetails(json.data);
      } else {
        console.error('Invalid data format:', json);
      }
    } catch (err) {
      console.error('Error fetching payout details:', err);
    }
  };

  useEffect(() => {
    fetchVendors();
    fetchBankDetails();
    fetchPayoutDetails();
  }, []);

  const handleVendorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const vendorId = e.target.value;
    const vendor = vendors.find((v) => v._id === vendorId) || null;
    setSelectedVendor(vendor);
    setFormData(vendor || {});
  };

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedVendor || !amount || !paymentMethod) {
      setMessage('Please fill all required fields.');
      return;
    }
    try {
      const res = await fetch(THIRD_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: selectedVendor._id,
          amount,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Payout processed successfully!');
        setAmount('');
        setPaymentMethod('');
        setSelectedVendor(null);
        setFormData({});
        fetchPayoutDetails(); // Refresh payout list
      } else {
        console.error('Payout failed:', data.message);
      }
    } catch (error) {
      setMessage('An error occurred while processing payout.');
    }
  };
  return (
    <div className="container my-5">
      <h5 className="text-secondary mb-3">Payout To Vendor</h5>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded-none shadow-sm"
        style={{ borderColor: '#6BB7BE' }}
      >
        <div className="mb-3">
          <label className="form-label">Select Vendor</label>
          <select className="form-select" onChange={handleVendorChange} required>
            <option value="">-- Select Vendor --</option>
            {vendors.map((v) => (
              <option key={v._id} value={v._id}>
                {v.companyName || 'Vendor'} ({v.workEmail})
              </option>
            ))}
          </select>
        </div>

        {selectedVendor && (
          <>
            <div className="mb-3">
              <label className="form-label">Amount (INR)</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter payout amount"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    onChange={handlePaymentMethodChange}
                    required
                    checked={paymentMethod === 'bank_transfer'}
                  />
                  <label className="form-check-label">Bank Transfer</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    onChange={handlePaymentMethodChange}
                    required
                    checked={paymentMethod === 'upi'}
                  />
                  <label className="form-check-label">UPI</label>
                </div>
              </div>
            </div>

            {paymentMethod === 'bank_transfer' && bankDetails.length > 0 && selectedVendor && (
              <>
                <div className="mb-2">
                  <strong style={{ color: '#6BB7BE' }}>Bank Details:</strong>
                </div>
                {bankDetails
                  .filter((detail) => detail.vendorId === selectedVendor._id)
                  .map((detail) => (
                    <div key={detail._id}>
                      <p>
                        <strong>Account Holder:</strong> {detail.accountHolder}
                      </p>
                      <p>
                        <strong>Account Number:</strong> {detail.accountNumber}
                      </p>
                      <p>
                        <strong>IFSC Code:</strong> {detail.ifscCode}
                      </p>
                      <p>
                        <strong>Bank Name:</strong> {detail.bankName}
                      </p>
                      <p>
                        <strong>Branch:</strong> {detail.branchName}
                      </p>
                    </div>
                  ))}
              </>
            )}

            {paymentMethod === 'upi' && selectedVendor && (
              <>
                <div className="mb-2">
                  <strong style={{ color: '#6BB7BE' }}>UPI Details:</strong>
                </div>
                <p>
                  <strong>UPI ID:</strong> {selectedVendor.upiId}
                </p>
                <p>
                  <strong>Email:</strong> {selectedVendor.workEmail}
                </p>
              </>
            )}
          </>
        )}

        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: '#6BB7BE', color: 'white', marginTop: '10px' }}
        >
          Submit Payout
        </button>

        {message && (
          <div className="alert alert-info mt-3" role="alert">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default PayoutToVendor;
