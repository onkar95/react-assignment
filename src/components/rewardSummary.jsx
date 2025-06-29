import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateMonthlyRewards } from '../utils/rewardUtils';
import { getMonthName } from '../utils/dateUtils';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: center;
`;

const Dropdown = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: #333;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

function RewardSummary({ customer, selectedYear, selectedMonth, setSelectedMonth, setSelectedYear, dropdownMonths, showRecentOnly, setShowRecentOnly }) {
  console.log("selectedMonth", selectedMonth, showRecentOnly)
  const monthlyRewards = useMemo(() => {
    return calculateMonthlyRewards(customer.transactions);
  }, [customer]);

  const monthKeys = Object.keys(monthlyRewards).filter((key) => key.startsWith(selectedYear));

  const total = monthKeys.reduce((sum, key) => sum + monthlyRewards[key], 0);

  return (
    <Wrapper>
      <div>
        <FiltersRow>
          <label>Year: </label>
          <Dropdown
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {[2025, 2024, 2023, 2022, 2021].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Dropdown>

          <label>Month: </label>
          <Dropdown
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {/* {showRecentOnly && <option value="default" >Last 3 Months</option>} */}
            {showRecentOnly ? <option value="default" >Last 3 Months</option> : <option value="All transaction" >All transaction</option>}
            {dropdownMonths && dropdownMonths.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}

          </Dropdown>

        </FiltersRow>

      </div>

      <h3>Total Rewards: {total} points</h3>
      <ul>
        {monthKeys.map((key) => (
          <li key={key}>
            {getMonthName(key.split('-')[1])}: {monthlyRewards[key]} points
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

RewardSummary.propTypes = {
  customer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    transactions: PropTypes.array.isRequired,
  }).isRequired,
  selectedYear: PropTypes.string.isRequired,
  selectedMonth: PropTypes.string,
  setSelectedMonth: PropTypes.func.isRequired,
  setSelectedYear: PropTypes.func.isRequired,
  dropdownMonths: PropTypes.func.isRequired,
};

export default RewardSummary;
