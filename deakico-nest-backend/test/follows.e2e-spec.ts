import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

let token;

describe('Follows controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(' should not log in nor return a jwt for an unregistered user', () => {
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

  it('/ (POST) Insert a new Follow.', () => {
    return request(app.getHttpServer())
      .post('/follows')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pa_id: 5,
      })
      .expect(201);
  });

  it('/ (GET) Get All Follows', () => {
    return request(app.getHttpServer()).get('/follows').expect(200);
  });

  it('/ (GET) Get All Followers (User Accounts) for a given Provider.', () => {
    return request(app.getHttpServer())
      .get('/follows/followers')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/ (GET) Get Follower count for a given provider.', () => {
    return request(app.getHttpServer())
      .get('/follows/followers/count')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/ (GET) Gets all users that follow a provider. ', () => {
    return request(app.getHttpServer())
      .get('/follows/following')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/ (GET) fetches the count of all users that follow a given provider.', () => {
    return request(app.getHttpServer())
      .get('/follows/following/count')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
