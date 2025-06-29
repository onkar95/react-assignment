// utils/rewardUtils.js

export function calculateRewardPoints(amount) {
    if (amount <= 50) return 0;
    if (amount <= 100) return Math.floor(amount - 50);
    return Math.floor((amount - 100) * 2 + 50);
  }
  
  export function calculateMonthlyRewards(transactions) {
    const monthly = {};
    transactions.forEach(({ amount, date }) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const key = `${year}-${month}`;
      const points = calculateRewardPoints(amount);
      if (!monthly[key]) monthly[key] = 0;
      monthly[key] += points;
    });
    return monthly;
  }
  