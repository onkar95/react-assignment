
import { calculateRewardPoints } from '../utils/rewardUtils';

describe('calculateRewardPoints', () => {
  test('should return 0 for amount less than 50', () => {
    expect(calculateRewardPoints(40)).toBe(0);
  });

  test('should return correct points for amount between 50 and 100', () => {
    expect(calculateRewardPoints(70)).toBe(20); // 70 - 50 = 20 points
  });

  test('should return correct points for amount over 100', () => {
    expect(calculateRewardPoints(120)).toBe(90); // 50 pts for $50-$100 + 40 for $20*2
  });

  test('should handle fractional amounts', () => {
    expect(calculateRewardPoints(120.5)).toBe(91); // 50 + (20.5 * 2)
  });

  test('should return 0 for negative amounts (invalid)', () => {
    expect(calculateRewardPoints(-50)).toBe(0);
  });

  test('should return 0 for non-numeric input', () => {
    expect(calculateRewardPoints('abc')).toBe(NaN);
    expect(calculateRewardPoints(null)).toBe(0);
  });
});
