import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { UserController } from '../UserController';
import { DataSignUp } from '../../interfaces/DataSignUp';

const mockController = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    controllers: [UserController],
  }).compile();

  return moduleFixture;
};

describe('UserController - create', () => {
  it('should return body', async () => {
    const moduleFixture = await mockController();
    const app = moduleFixture.createNestApplication();

    await app.init();

    const data: DataSignUp = { password: 'ABC1234', username: 'test' };

    const { body, status } = await request(app.getHttpServer()).post(
      'auth/signup',
    );

    expect(status).toStrictEqual(HttpStatus.CREATED);
    expect(body).toMatchObject(data);
  });
});
