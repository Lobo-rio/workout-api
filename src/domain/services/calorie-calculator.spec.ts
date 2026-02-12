import { CalorieCalculator } from './calorie-calculator';

describe('CalorieCalculator', () => {
  it('should calculate calories correctly', () => {
    const calc = new CalorieCalculator();
    expect(calc.calculate(8, 80, 30)).toBeCloseTo(320);
  });
});
