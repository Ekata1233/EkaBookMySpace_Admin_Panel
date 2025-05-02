import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Stack } from '@mui/material';
import SaleCard from './SaleCard';
import OrderIcon from 'components/icons/OrderIcon';
import SalesIcon from 'components/icons/SalesIcon';
import { SvgIconProps } from '@mui/material';

interface SaleItem {
  label: string;
  value: string;
  growth: string;
  bgColor: string;
  iconBackgroundColor: string;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
}

const Sales = () => {
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [totalCommission, setTotalCommission] = useState<number>(0);
  const [totalSentToVendors, setTotalSentToVendors] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);

  const fetchRazorpayData = async () => {
    try {
      const res = await fetch('https://book-my-space-eta.vercel.app/api/book');
      const json = await res.json();

      if (Array.isArray(json.data)) {
        const earnings = json.data.reduce(
          (sum: number, item: { totalPay: number }) => sum + (item.totalPay || 0),
          0,
        );
        setTotalEarnings(earnings);
        setTotalBookings(json.data.length);

        // Calculate commission (15% of total earnings)
        const commission = earnings * 0.15;
        setTotalCommission(commission);

        const sentToVendors = json.data.reduce(
          (sum: number, item: { totalPay: number }) => sum + (item.totalPay || 0),
          0,
        );
        setTotalSentToVendors(sentToVendors);
      } else {
        console.error('Invalid data format:', json);
      }
    } catch (err) {
      console.error('Error fetching Razorpay data:', err);
    }
  };

  useEffect(() => {
    fetchRazorpayData();
  }, []);

  const sales: SaleItem[] = [
    {
      label: 'Total Earnings',
      value: `₹${totalEarnings.toLocaleString()}`,
      growth: '+8%',
      bgColor: 'error.lighter',
      iconBackgroundColor: 'error.main',
      svgIcon: SalesIcon,
    },
    {
      label: 'Admin Commission (total earned)',
      value: `₹${totalCommission.toLocaleString()}`,
      growth: '+5%',
      bgColor: 'warning.lighter',
      iconBackgroundColor: 'error.dark',
      svgIcon: OrderIcon,
    },
    {
      label: 'Total Sent to Vendors',
      value: `₹${totalSentToVendors.toLocaleString()}`,
      growth: '+3%',
      bgColor: 'success.lighter',
      iconBackgroundColor: 'success.darker',
      icon: 'ion:send',
    },
    {
      label: 'Total Bookings (All Vendors)',
      value: `${totalBookings}`,
      growth: '+7%',
      bgColor: 'secondary.lighter',
      iconBackgroundColor: 'secondary.main',
      icon: 'material-symbols:bookmark',
    },
  ];

  return (
    <Paper sx={{ pt: 2.875, pb: 4, px: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5.375}>
        <div>
          <Typography variant="h4" mb={0.5}>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="primary.lighter">
            Summary
          </Typography>
        </div>
      </Stack>

      <Grid
        container
        spacing={{ xs: 3.875, xl: 2 }}
        columns={{ xs: 1, sm: 2, md: 4 }}
        sx={{ height: '400px' }}
      >
        {sales.map((item) => (
          <Grid
            item
            xs={1}
            key={item.label}
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <SaleCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Sales;
