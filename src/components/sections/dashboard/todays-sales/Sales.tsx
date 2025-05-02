'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Stack, Button } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
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

  const fetchRazorpayData = async () => {
    try {
      const res = await fetch('https://book-my-space-eta.vercel.app/api/book');
      const json = await res.json();

      if (Array.isArray(json.data)) {
        const earnings = json.data.reduce(
          (sum: number, item: { totalPay: number }) => sum + (item.totalPay || 0),
          0, // ✅ Comma added to fix ESLint/Prettier issue
        );
        setTotalEarnings(earnings);
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
      label: 'Total Order',
      value: '300',
      growth: '+5%',
      bgColor: 'warning.lighter',
      iconBackgroundColor: 'error.dark',
      svgIcon: OrderIcon,
    },
    {
      label: 'Sold',
      value: '5',
      growth: '+1.2%',
      bgColor: 'success.lighter',
      iconBackgroundColor: 'success.darker',
      icon: 'ion:pricetag',
    },
    {
      label: 'Customers',
      value: '8',
      growth: '+0.5%',
      bgColor: 'secondary.lighter',
      iconBackgroundColor: 'secondary.main',
      icon: 'material-symbols:person-add',
    },
  ];

  return (
    <Paper sx={{ pt: 2.875, pb: 4, px: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5.375}>
        <div>
          <Typography variant="h4" mb={0.5}>
            Today's Sales
          </Typography>
          <Typography variant="subtitle1" color="primary.lighter">
            Sales Summary
          </Typography>
        </div>
        <Button variant="outlined" startIcon={<IconifyIcon icon="solar:upload-linear" />}>
          Export
        </Button>
      </Stack>

      <Grid container spacing={{ xs: 3.875, xl: 2 }} columns={{ xs: 1, sm: 2, md: 4 }}>
        {sales.map((item) => (
          <Grid item xs={1} key={item.label}>
            <SaleCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Sales;
