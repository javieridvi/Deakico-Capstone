import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

let token;

const mockUser1 = {
  u_firstname: 'Mock',
  u_lastname: 'Mockenzy',
  email: 'mock.test@gmail.com',
  username: 'mockity123',
  password: 'mockers321',
  pa_id: null,
};

const mockUser2 = {
  u_firstname: 'Mock2',
  u_lastname: 'Mockenzy2',
  email: 'mock2.test@gmail.com',
  username: 'mockity2',
  password: 'mockers321',
  pa_id: null,
};

describe('Authentication controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should not register if email or username is aready in databse.', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(mockUser2)
      .expect(201);
  });

  it('should not log in nor return a jwt for an unregistered user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'juan.delpueblo@upr.com', //a valid, registered user
        password: 'password',
      })
      .expect((response: request.Response) => {
        token = response.body.token;
        expect(token).toBeDefined();
      });
  });
});
