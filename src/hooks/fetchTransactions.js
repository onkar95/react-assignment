export const fetchTransactions = async () => {
    try {
      const res = await fetch('/data/transactions.json');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      // console.log("data",data)
      return new Promise(resolve => setTimeout(() => resolve(data), 1000)); // Simulate delay
    } catch (err) {
      throw err;
    }
  };
  