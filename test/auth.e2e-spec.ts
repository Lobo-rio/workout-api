import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { ZodExceptionFilter } from './../src/infra/http/filters/zod-exception.filter';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    process.env.SUPABASE_URL = 'http://127.0.0.1:54321';
    process.env.SUPABASE_ANON_KEY =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new ZodExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/sign-in (POST)', () => {
    it('should return 401 for invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ email: 'invalid@example.com', password: 'wrongpass' })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toContain('invalidas');
        });
    });

    it('should return 400 for invalid email format', () => {
      return request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ email: 'not-an-email', password: 'password' })
        .expect(400);
    });

    it('should return 400 for missing password', () => {
      return request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ email: 'test@example.com' })
        .expect(400);
    });
  });

  describe('/auth/sign-out (POST)', () => {
    it('should return 401 for invalid tokens', () => {
      return request(app.getHttpServer())
        .post('/auth/sign-out')
        .send({ accessToken: 'invalid', refreshToken: 'invalid' })
        .expect(401);
    });

    it('should return 400 for missing tokens', () => {
      return request(app.getHttpServer())
        .post('/auth/sign-out')
        .send({})
        .expect(400);
    });
  });

  describe('Protected endpoints', () => {
    it('should return 401 without authentication', () => {
      return request(app.getHttpServer()).get('/profile/me').expect(401);
    });

    it('should return 401 with invalid token', () => {
      return request(app.getHttpServer())
        .get('/profile/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});
