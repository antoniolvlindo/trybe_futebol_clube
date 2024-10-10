import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamService from '../services/TeamService';
import { Request as Req, Response as Res } from 'express';

chai.use(chaiHttp);
const { expect } = chai;
import {
  getAllFromService,
  getAllTeams,
  getByFromService,

} from './mock/Teams.mock';
import TeamController from '../controllers/TeamController';

describe('Teams', function() {
  beforeEach(function () {
    sinon.restore()
  })

  it('/teams - GET', async function() {
    sinon.stub(new TeamService, 'getAllTeam').resolves(getAllFromService)

    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    }

    await new TeamController().getAllTeams(req as Req, res as unknown as Res)
    expect(res.status.calledWith(200)).to.be.true
    expect(res.json.calledWith(getAllTeams)).to.be.true
  })

  it('/teams/:id - GET', async function() {
    sinon.stub(new TeamService, 'getTeamById').resolves(getByFromService)
  
    const req = {
      params: {
        id: 1
      }
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    }
  
    await new TeamController().getTeamById(req as unknown as Req, res as unknown as Res)
  
    const returnedTeam = res.json.getCall(0).args[0].dataValues;
  
    expect(res.status.calledWith(200)).to.be.true
    expect(returnedTeam).to.deep.equal(getByFromService.data);
  })

})
