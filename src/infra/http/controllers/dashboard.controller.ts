import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetDashboardDataUseCase } from '../../../application/use-cases/get-dashboard-data.use-case';
import { getDashboardDataSchema } from '../../../application/dto/get-dashboard-data.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly getDashboardData: GetDashboardDataUseCase) {}

  @Get()
  async get(@Query() query: unknown) {
    const input = getDashboardDataSchema.parse(query);
    return this.getDashboardData.execute(input);
  }
}
