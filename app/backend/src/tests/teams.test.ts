import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';
const { teamSingular, teamsArray } = require('./utils');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes dos endpoints /teams e /teams/:id', () => {

  let chaiHttpResponse: Response;

  describe('Retornos bem sucedidos', () => {
    before(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(teamsArray);
  
      sinon
        .stub(Team, 'findByPk')
        .resolves(teamSingular);
    });
  
    after(()=>{
      (Team.findAll as sinon.SinonStub).restore();
      (Team.findByPk as sinon.SinonStub).restore();
    })

    it('O endpoint retorna todos os times', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.an('array');
    });

    it('O endpoint retorna o time especificado pela id', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('id');
      expect(chaiHttpResponse.body).to.have.property('teamName');
    });
  })

  describe('O time não existe', () => {

    before(async () => {
      sinon
        .stub(Team, 'findByPk')
        .resolves(null);
    });
  
    after(()=>{
      (Team.findByPk as sinon.SinonStub).restore();
    })

    it('Não é possível retornar um time não cadastrado', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/999999');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.equal(null);
    });
  })
});
