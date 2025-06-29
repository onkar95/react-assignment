import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 6px;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  background-color: ${({ active }) => (active ? '#3498db' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  border-radius: 4px;
  cursor: pointer;
  min-width: 36px;

  &:hover {
    background-color: ${({ active }) => (active ? '#2980b9' : '#f1f1f1')};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #eee;
    color: #aaa;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <PaginationWrapper>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </PageButton>

      {getPageNumbers().map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          active={page === currentPage}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PageButton>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
