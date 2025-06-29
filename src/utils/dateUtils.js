// utils/dateUtils.js

export function getMonthName(month) {
    const monthIndex = parseInt(month, 10) - 1;
    return [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ][monthIndex];
  }
  
  export function extractYears(transactions) {
    const yearSet = new Set();
    transactions.forEach(txn => {
      const year = new Date(txn.date).getFullYear();
      yearSet.add(year);
    });
    return Array.from(yearSet).sort((a, b) => b - a);
  }
  
  export const getLastThreeMonths = () => {
    const now = new Date();
    const result = [];
  
    for (let i = 0; i < 3; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      result.push({ label: `${month}-${year}`, value: month });
    }
  
    return result;
  };
  