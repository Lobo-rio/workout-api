import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/use-cases/create-user.use-case';
import { createUserSchema } from '../../../application/dto/create-user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  async create(@Body() body: unknown) {
    const input = createUserSchema.parse(body);
    return this.createUser.execute(input);
  }

  @Get('me')
  async me() {
    return { status: 'ok' };
  }
}
