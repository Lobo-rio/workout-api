export class CalorieCalculator {
  calculate(met: number, weight: number, minutes: number): number {
    return met * weight * (minutes / 60);
  }
}
