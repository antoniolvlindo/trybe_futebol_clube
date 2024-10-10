import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Request as Req, Response as Res } from 'express'
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

chai.use(chaiHttp);
const { expect } = chai;

import { 
  successfulLogin,
  wrongEmailOrPasswordLogin,
  missingEmailOrPasswordLogin,
} from './mock/Login.mock';

describe('/login', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('POST /login: Deve permitir login com credenciais válidas', async function () {
    sinon.stub(new LoginService, 'login').resolves(await (successfulLogin as unknown as ReturnType<LoginService['login']>));

    const req = {
      body: {
        email: 'admin@admin.com',
        password: 'secret_admin'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await new LoginController().login(req as unknown as Req, res as unknown as Res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ token: sinon.match.string })).to.be.true;
  });

  it('POST /login: Deve retornar erro ao tentar login com email inválido', async function () {
    sinon.stub(new LoginService, 'login').resolves(await (wrongEmailOrPasswordLogin as unknown as ReturnType<LoginService['login']>));

    const req = {
      body: {
        email: '@admin.com',
        password: 'secret_admin'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await new LoginController().login(req as unknown as Req, res as unknown as Res);
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Invalid email or password' })).to.be.true;
  });

  it('POST /login: Deve retornar erro ao tentar login com senha inválida', async function () {
    sinon.stub(new LoginService, 'login').resolves(await (wrongEmailOrPasswordLogin as unknown as ReturnType<LoginService['login']>));

    const req = {
      body: {
        email: 'admin@admin.com',
        password: 'admin'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await new LoginController().login(req as unknown as Req, res as unknown as Res);
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Invalid email or password' })).to.be.true;
  });

  it('POST /login: Deve retornar erro ao tentar login sem email', async function () {
    sinon.stub(new LoginService, 'login').resolves(await (missingEmailOrPasswordLogin as unknown as ReturnType<LoginService['login']>));

    const req = {
      body: {
        password: 'secret_admin'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await new LoginController().login(req as unknown as Req, res as unknown as Res);
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: 'All fields must be filled' })).to.be.true;
  });

  it('POST /login: Deve retornar erro ao tentar login sem senha', async function () {
    sinon.stub(new LoginService, 'login').resolves(await (missingEmailOrPasswordLogin as unknown as ReturnType<LoginService['login']>));

    const req = {
      body: {
        email: 'admin@admin.com'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await new LoginController().login(req as unknown as Req, res as unknown as Res);
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: 'All fields must be filled' })).to.be.true;
  });

  it('POST /login: Deve retornar erro ao tentar login com senha menor que 6 caracteres', async function () {
    sinon.stub(new LoginService, 'login').resolves(await (wrongEmailOrPasswordLogin as unknown as ReturnType<LoginService['login']>));

    const req = {
      body: {
        email: 'admin@admin.com',
        password: '123'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await new LoginController().login(req as unknown as Req, res as unknown as Res);
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Invalid email or password' })).to.be.true;
  });

});