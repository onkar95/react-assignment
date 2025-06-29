import React from 'react';
import { render, screen } from '@testing-library/react';
import RewardSummary from '../components/rewardSummary';

const mockCustomer = {
  customerId: 'user1',
  transactions: [
    { date: '2025-05-01', amount: 120 },
    { date: '2025-05-15', amount: 60 },
    { date: '2025-04-20', amount: 30 },
  ],
};

test('renders total rewards and month breakdown', () => {
  render(
    <RewardSummary
      customer={mockCustomer}
      selectedYear="2025"
      selectedMonth="default"
      setSelectedMonth={() => {}}
      setSelectedYear={() => {}}
      dropdownMonths={[{ label: 'May', value: '05' }]}
      showRecentOnly={true}
      setShowRecentOnly={() => {}}
    />
  );

  expect(screen.getByText(/Total Rewards:/)).toBeInTheDocument();
  expect(screen.getByText(/May:/)).toBeInTheDocument();
});
