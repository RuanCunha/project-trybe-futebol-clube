import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import sequelize from '../database/models';

import { leaderboardHome, leaderboardAway } from './utils';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Leaderboard', () => {

  let chaiHttpResponse: Response;

  describe('Leaderboard Home', () => {
    before(async () => {
      sinon
        .stub(sequelize, "query")
        .resolves([leaderboardHome] as any)
    });
  
    after(()=>{
      (sequelize.query as sinon.SinonStub).restore();
    })
  
    it('Retorna leaderboard home', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');

    });
  })

  describe('Leaderboard Away', () => {
    before(async () => {
      sinon
        .stub(sequelize, "query")
        .resolves([leaderboardAway] as any)
    });
  
    after(()=>{
      (sequelize.query as sinon.SinonStub).restore();
    })
  
    it('Retorna leaderboard away', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');

    });
  })
});
