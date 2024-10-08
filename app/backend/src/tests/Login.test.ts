import * as request from 'supertest';
import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUsers';

describe('POST /login', () => {
  let userStub: sinon.SinonStub;

  beforeAll(() => {
    userStub = sinon.stub(SequelizeUser, 'findOne');
  });

  afterAll(() => {
    userStub.restore();
  });

  it('should return 200 and a token for valid credentials', async () => {
    userStub.resolves({
      id: 1,
      email: 'user@example.com',
      password: bcrypt.hashSync('password', 8),
      role: 'admin',
    });

    const res = await request(app)
      .post('/login')
      .send({ email: 'user@example.com', password: 'password' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});