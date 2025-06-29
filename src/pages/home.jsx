
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DataContext } from '../context/dataContext';
import Spinner from '../components/spinner';
import { getLastThreeMonths } from '../utils/dateUtils';
import Pagination from '../components/pagination';
import { ActionButton, ErrorText, PageWrapper, StyledTable, TableWrapper } from '../components/styled/homeStyled';
import { Heading } from '../components/styled/UserDetailsStyles';
import logger from '../utils/logger';


function Home() {
  const { transactions, loading, error } = useContext(DataContext);
  const [filteredTxns, setFilteredTxns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const months = getLastThreeMonths();
    const currentMonthValues = months.map((m) => m.value);
    const currentYear = new Date().getFullYear();
    const recentTxns = transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      const month = String(txnDate.getMonth() + 1).padStart(2, '0');
      const year = txnDate.getFullYear();
      return currentMonthValues.includes(month) && year === currentYear;
    });
    setFilteredTxns(recentTxns);
  }, [transactions]);

  const customers = useMemo(() => {
    return Array.from(
      transactions.reduce((map, txn) => {
        if (!map.has(txn.customerId)) {
          map.set(txn.customerId, { customerId: txn.customerId, count: 0 });
        }
        map.get(txn.customerId).count += 1;
        return map;
      }, new Map()).values()
    );
  }, [transactions]);

  const paginatedTxns = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return customers.slice(start, start + itemsPerPage);
  }, [customers, currentPage]);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  if (loading) return <Spinner />;
  if (error) return <ErrorText>{error}</ErrorText>;
  logger.info("rendering home page with users list")
  
  return (
    <PageWrapper>
      <Heading>Customers List</Heading>

      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Total Transactions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTxns.map((cust) => (
              <tr key={cust.customerId}>
                <td>{cust.customerId}</td>
                <td>{cust.count}</td>
                <td>
                  <ActionButton onClick={() => navigate(`/user/${cust.customerId}`)}>
                    View Details
                  </ActionButton>
                </td>
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
    </PageWrapper>
  );
}

export default Home;
