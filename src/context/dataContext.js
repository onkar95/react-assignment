// src/context/DataContext.js
import React, { createContext, useEffect, useState } from 'react';
import { fetchTransactions } from '../hooks/fetchTransactions';
import logger from '../utils/logger';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
        logger.info('Data loaded successfully');
      })
      .catch((err) => {
        setError('Failed to load data');
        logger.error('Failed to load transactions', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DataContext.Provider value={{ transactions, error, loading }}>
      {children}
    </DataContext.Provider>
  );
};
