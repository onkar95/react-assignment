import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionTable from '../components/transactionTable';

const customerData = {
  customerId: 'user1',
  transactions: [
    {
      transactionId: 'txn1',
      date: '2025-05-01',
      amount: 120,
    },
    {
      transactionId: 'txn2',
      date: '2025-04-01',
      amount: 60,
    },
  ],
};

test('renders transaction rows correctly', () => {
  render(
    <TransactionTable
      customer={customerData}
      selectedMonth="default"
      selectedYear="2025"
    />
  );

  expect(screen.getByText(/txn1/)).toBeInTheDocument();
  expect(screen.getByText(/txn2/)).toBeInTheDocument();
  expect(screen.getByText(/Reward Points/)).toBeInTheDocument();
});
