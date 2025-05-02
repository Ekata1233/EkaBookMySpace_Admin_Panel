// import { useEffect, useState } from 'react';
// import { SvgIconProps } from '@mui/material';
// import OrderIcon from 'components/icons/OrderIcon';
// import SalesIcon from 'components/icons/SalesIcon';

// export interface SaleItem {
//   label: string;
//   value: string;
//   growth: string;
//   bgColor: string;
//   iconBackgroundColor: string;
//   icon?: string;
//   svgIcon?: (props: SvgIconProps) => JSX.Element;
// }

// const API_URL = 'https://book-my-space-eta.vercel.app/api/book';
// const [totalEarnings, setTotalEarnings] = useState<number>(0); // State for total earnings

// // Fetch Razorpay data to get total earnings
// const fetchRazorpayData = async () => {
//   try {
//     const res = await fetch(API_URL);
//     const json = await res.json();

//     if (Array.isArray(json.data)) {
//       const earnings = json.data.reduce(
//         (sum: number, item: { totalPay: number }) => sum + (item.totalPay || 0),
//         0,
//       );
//       setTotalEarnings(earnings); // Update total earnings state
//     } else {
//       console.error('Invalid data format:', json);
//     }
//   } catch (err) {
//     console.error('Error fetching Razorpay data:', err);
//   }
// };

// useEffect(() => {
//   fetchRazorpayData(); // Fetch data when component mounts
// }, []);
// export const sales: SaleItem[] = [
//   {
//     label: 'Total Earnings',
//     value: `₹${totalEarnings.toLocaleString()}`, // Dynamically display total earnings
//     growth: '+8%', // Example growth, can be replaced with actual logic
//     bgColor: 'error.lighter',
//     iconBackgroundColor: 'error.main',
//     svgIcon: SalesIcon,
//   },
//   {
//     label: 'Total Order',
//     value: '300',
//     growth: '+5%',
//     bgColor: 'warning.lighter',
//     iconBackgroundColor: 'error.dark',
//     svgIcon: OrderIcon,
//   },
//   {
//     label: 'Sold',
//     value: '5',
//     growth: '+1.2%',
//     bgColor: 'success.lighter',
//     iconBackgroundColor: 'success.darker',
//     icon: 'ion:pricetag',
//   },
//   {
//     label: 'Customers',
//     value: '8',
//     growth: '+0.5%',
//     bgColor: 'secondary.lighter',
//     iconBackgroundColor: 'secondary.main',
//     icon: 'material-symbols:person-add',
//   },
// ];
