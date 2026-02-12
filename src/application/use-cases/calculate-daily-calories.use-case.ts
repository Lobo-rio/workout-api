import { Injectable } from '@nestjs/common';
import { CalorieCalculator } from '../../domain/services/calorie-calculator';
import { CalculateDailyCaloriesDto } from '../dto/calculate-daily-calories.dto';

@Injectable()
export class CalculateDailyCaloriesUseCase {
  constructor(private readonly calculator: CalorieCalculator) {}

  async execute(input: CalculateDailyCaloriesDto): Promise<number> {
    return this.calculator.calculate(input.met, input.peso, input.minutos);
  }
}
