import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { calculateRewardPoints } from '../utils/rewardUtils';
import { StyledTable, TableWrapper } from './styled/transactionTableStyles';
import Pagination from './pagination';


function TransactionTable({ customer, selectedMonth, selectedYear }) {

  console.log("customer", customer)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const filteredTransactions = useMemo(() => {
    return customer.transactions.filter(txn => {
      if (selectedMonth === 'default' || selectedMonth === "All transaction") return customer
      const date = new Date(txn.date);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return year === selectedYear && (!selectedMonth || selectedMonth === month);
    });
  }, [customer, selectedMonth, selectedYear]);




  const paginatedTxns = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  if (!filteredTransactions.length && selectedMonth !== 'default' && selectedMonth !== "All transaction") {
    return <p>No transactions for selected month/year.</p>;
  }
  return (
    <>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction ID</th>
              <th>Amount ($)</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTxns.map(txn => (
              <tr key={txn.transactionId}>
                <td>{txn.date}</td>
                <td>{txn.transactionId}</td>
                <td>{txn.amount.toFixed(2)}</td>
                <td>{calculateRewardPoints(txn.amount)}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}

TransactionTable.propTypes = {
  customer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    transactions: PropTypes.array.isRequired,
  }).isRequired,
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.string.isRequired,
};

export default TransactionTable;
