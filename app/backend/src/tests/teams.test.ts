import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teamsArray = [
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  },
  {
    id: 3,
    teamName: "Botafogo"
  },
  {
    id: 4,
    teamName: "Corinthians"
  },
  {
    id: 5,
    teamName: "Cruzeiro"
  },
  {
    id: 6,
    teamName: "Ferroviária"
  },
  {
    id: 7,
    teamName: "Flamengo"
  },
  {
    id: 8,
    teamName: "Grêmio"
  },
  {
    id: 9,
    teamName: "Internacional"
  },
  {
    id: 10,
    teamName: "Minas Brasília"
  },
  {
    id: 11,
    teamName: "Napoli-SC"
  },
  {
    id: 12,
    teamName: "Palmeiras"
  },
  {
    id: 13,
    teamName: "Real Brasília"
  },
  {
    id: 14,
    teamName: "Santos"
  },
  {
    id: 15,
    teamName: "São José-SP"
  },
  {
    id: 16,
    teamName: "São Paulo"
  }
]

const teamSingular = {
  id: 1,
  teamName: "Avaí/Kindermann"
}

describe('Testes dos endpoints /teams e /teams/:id', () => {

  let chaiHttpResponse: Response;

  describe('Retornos bem sucedidos', () => {
    before(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(teamsArray as any);
  
      sinon
        .stub(Team, 'findByPk')
        .resolves(teamSingular as any);
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
