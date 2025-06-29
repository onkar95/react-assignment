

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/dataContext';
import RewardSummary from '../components/rewardSummary';
import TransactionTable from '../components/transactionTable';
import Spinner from '../components/spinner';
import { FaArrowLeft } from 'react-icons/fa';

import { getLastThreeMonths } from '../utils/dateUtils';
import {
  sortTransactionsByDate,
  getDropdownMonths,
  filterTransactions,
} from '../utils/transactionUtils';

import {
  Container,
  Heading,
  ErrorText,
  BackButton,
} from '../components/styled/UserDetailsStyles';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, loading, error } = useContext(DataContext);

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [filteredTxns, setFilteredTxns] = useState([]);
  const [defaultTxns, setDefaultTxns] = useState([]);
  const [dropdownMonths, setDropdownMonths] = useState([]);
  const [showRecentOnly, setShowRecentOnly] = useState(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const months = getDropdownMonths(selectedYear);
    setDropdownMonths(months);

    if (Number(selectedYear) === currentYear) {
      const recentMonths = getLastThreeMonths();
      const monthValues = recentMonths.map((m) => m.value);

      const lastThreeTxns = transactions.filter((txn) => {
        const txnDate = new Date(txn.date);
        const txnMonth = String(txnDate.getMonth() + 1).padStart(2, '0');
        const txnYear = txnDate.getFullYear();
        return (
          txn.customerId === id &&
          monthValues.includes(txnMonth) &&
          txnYear === currentYear
        );
      });

      setDefaultTxns(sortTransactionsByDate(lastThreeTxns, 'desc'));
      setSelectedMonth('default');
      setShowRecentOnly(true);
    } else {
      const allYearTxns = filterTransactions(transactions, id, selectedYear);
      setDefaultTxns(sortTransactionsByDate(allYearTxns, 'asc'));
      setSelectedMonth('All transaction');
      setShowRecentOnly(false);
    }
  }, [transactions, id, selectedYear]);

  useEffect(() => {
    if (!selectedMonth || selectedMonth === 'default' || selectedMonth === 'All transaction') {
      setFilteredTxns([]);
      return;
    }
    const filtered = filterTransactions(transactions, id, selectedYear, selectedMonth);
    setFilteredTxns(filtered);
  }, [transactions, id, selectedMonth, selectedYear]);

  if (loading) return <Spinner />;
  if (error) return <ErrorText>{error}</ErrorText>;

  const customerData = {
    customerId: id,
    transactions: selectedMonth === 'default' || selectedMonth === 'All transaction'
      ? defaultTxns
      : filteredTxns,
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </BackButton>
      <Heading>Details for Customer ID: {id}</Heading>

      <RewardSummary
        customer={customerData}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dropdownMonths={dropdownMonths}
        showRecentOnly={showRecentOnly}
        setShowRecentOnly={setShowRecentOnly}
      />

      <TransactionTable
        customer={customerData}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </Container>
  );
};

export default UserDetails;
