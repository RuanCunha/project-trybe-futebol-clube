import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';

import { Response } from 'superagent';
import { matches } from './utils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes das matches', () => {

  let chaiHttpResponse: Response;

  describe('Retorna todas as partidas', () => {
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(matches as any);
    });
  
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('O endpoint retorna todos as partidas', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
    });
  })

  describe('Retorna partidas finalizadas', () => {
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(matches[1] as any);
    });
  
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('O endpoint retorna todos as partidas finalizadas', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
    });
  })

  describe('Retorna partidas em andamento', () => {
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(matches[40] as any);
    });
  
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('O endpoint retorna todos as partidas em andamento', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
    });
  })

  describe('Finaliza uma partida', () => {
    before(async () => {
      sinon
        .stub(Match, "update")
        .resolves(undefined);
    });
  
    after(() => {
      (Match.update as sinon.SinonStub).restore();
    })

    it('O endpoint finaliza a partida', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/41/finish');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Finished');
    });
  })
});
