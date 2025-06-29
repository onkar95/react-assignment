import styled from "styled-components";

// Styled Components
export const PageWrapper = styled.div`
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Segoe UI', sans-serif;
`;

export const Heading = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 24px;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  min-width: 600px;

  th, td {
    padding: 14px 16px;
    text-align: left;
  }

  th {
    background-color: #f4f6f8;
    color: #34495e;
    font-weight: 600;
    border-bottom: 1px solid #e0e0e0;
  }

  tbody tr {
    border-bottom: 1px solid #f1f1f1;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  tbody tr:hover {
    background-color: #f0f8ff;
    transition: background-color 0.3s ease;
  }
`;

export const ActionButton = styled.button`
  background-color: #3498db;
  border: none;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;