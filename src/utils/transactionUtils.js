export const sortTransactionsByDate = (transactions, sortOrder = 'desc') => {
    if (!Array.isArray(transactions)) return [];
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    return [...transactions].sort((a, b) =>
      a.date.localeCompare(b.date) * multiplier
    );
  };
  
  export const getDropdownMonths = (year) => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const months = [];
  
    for (let i = 1; i <= 12; i++) {
      if (Number(year) === currentYear && i > currentMonth) break;
      months.push({
        label: new Date(0, i - 1).toLocaleString('default', { month: 'long' }),
        value: String(i).padStart(2, '0'),
      });
    }
  
    return months;
  };
  
  export const filterTransactions = (transactions, id, year, month = null) => {
    return transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      const txnMonth = String(txnDate.getMonth() + 1).padStart(2, '0');
      const txnYear = txnDate.getFullYear();
  
      return (
        txn.customerId === id &&
        txnYear === Number(year) &&
        (month ? txnMonth === month : true)
      );
    });
  };
  