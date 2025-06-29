import styled from 'styled-components';

export const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  background: #fff;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', sans-serif;
  font-size: 0.95rem;
  min-width: 600px;

  th, td {
    padding: 12px 16px;
    text-align: left;
  }

  th {
    background-color: #f7f9fc;
    font-weight: 600;
    color: #2c3e50;
    border-bottom: 1px solid #e0e0e0;
  }

  tbody tr {
    border-bottom: 1px solid #f0f0f0;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  tbody tr:hover {
    background-color: #f0f8ff;
    transition: background-color 0.3s ease;
  }

  td {
    color: #34495e;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #888;
  font-style: italic;
`;
