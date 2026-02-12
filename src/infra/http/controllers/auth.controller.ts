import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { signInSchema } from '../../../application/dto/sign-in.dto';
import { signOutSchema } from '../../../application/dto/sign-out.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() body: unknown) {
    const input = signInSchema.parse(body);
    return this.authService.signIn(input);
  }

  @Post('sign-out')
  async signOut(@Body() body: unknown) {
    const input = signOutSchema.parse(body);
    return this.authService.signOut(input);
  }
}
