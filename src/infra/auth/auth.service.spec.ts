import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

const signInWithPassword = jest.fn();
const setSession = jest.fn();
const signOut = jest.fn();

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword,
      setSession,
      signOut,
    },
  })),
}));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    process.env.SUPABASE_URL = 'http://localhost:54323';
    process.env.SUPABASE_ANON_KEY = 'anon-key';
    service = new AuthService();
  });

  afterEach(() => {
    signInWithPassword.mockReset();
    setSession.mockReset();
    signOut.mockReset();
  });

  it('returns tokens on sign in', async () => {
    signInWithPassword.mockResolvedValue({
      data: {
        session: {
          access_token: 'access',
          refresh_token: 'refresh',
          expires_in: 3600,
          token_type: 'bearer',
        },
        user: { id: 'user-1', email: 'test@example.com' },
      },
      error: null,
    });

    await expect(
      service.signIn({ email: 'test@example.com', password: 'secret123' }),
    ).resolves.toEqual({
      accessToken: 'access',
      refreshToken: 'refresh',
      expiresIn: 3600,
      tokenType: 'bearer',
      user: { id: 'user-1', email: 'test@example.com' },
    });
  });

  it('throws Unauthorized on invalid credentials', async () => {
    signInWithPassword.mockResolvedValue({
      data: { session: null, user: null },
      error: new Error('Invalid login credentials'),
    });

    await expect(
      service.signIn({ email: 'test@example.com', password: 'wrong' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('signs out with access and refresh token', async () => {
    setSession.mockResolvedValue({ data: { session: {} }, error: null });
    signOut.mockResolvedValue({ error: null });

    await expect(
      service.signOut({ accessToken: 'access', refreshToken: 'refresh' }),
    ).resolves.toEqual({ status: 'signed_out' });
  });
});
