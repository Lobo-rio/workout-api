import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createSupabaseAuthClient } from '../database/supabase/supabase-client';
import { SignInInput } from '../../application/dto/sign-in.dto';
import { SignOutInput } from '../../application/dto/sign-out.dto';

@Injectable()
export class AuthService {
  async signIn({ email, password }: SignInInput) {
    const client = await createSupabaseAuthClient();

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      throw new UnauthorizedException('Credenciais invalidas.');
    }

    const { session, user } = data;

    return {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      expiresIn: session.expires_in,
      tokenType: session.token_type,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async signOut({ accessToken, refreshToken }: SignOutInput) {
    const client = await createSupabaseAuthClient();

    const { error: sessionError } = await client.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (sessionError) {
      throw new UnauthorizedException('Token invalido.');
    }

    const { error } = await client.auth.signOut({ scope: 'global' });

    if (error) {
      throw new BadRequestException('Nao foi possivel sair.');
    }

    return { status: 'signed_out' };
  }
}
