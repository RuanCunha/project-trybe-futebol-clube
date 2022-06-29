import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
const {
  loginCorreto,
  loginSemSenha,
  loginSemEmail,
  loginSenhaIncorreta,
  loginEmailIncorreto } = require('./utils')



import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const fakeAuth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NTY9MzM4MzUsImV4cCI6MTY1NjU2OTgzNX5.Zqxj9jgzlt5FeNOnDffT4TY1eQHaA-I_Drymshj6bsq"

describe('Testes de Login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: 'admin',
        email: 'admin@admin.com',
        role: 'admin',
        password: '$2a$04$M7hUZciSJWdhCiPsAWkpqeAT4gEAkgTBGnSG0CHyxrlM4Hw6i/4.i'
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('É possível fazer login com a senha e email corretos', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginCorreto);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Não é possível fazer login sem senha', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginSemSenha)
    expect(chaiHttpResponse.status).to.be.equal(400);
  });

  it('Não é possível fazer login sem email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginSemEmail)
    expect(chaiHttpResponse.status).to.be.equal(400);
  });

  it('Não é possível fazer login com senha incorreta', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginSenhaIncorreta)
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('Após o login correto, retorna o role', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginCorreto)

    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', chaiHttpResponse.body.token)
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.text).to.be.equal('"admin"');
  });

  it('Com chave JWT inválida, não retorna o role', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', fakeAuth)
    expect(chaiHttpResponse.status).to.be.equal(500);
  });

  // it('Se não tiver authorization, retorna o erro', async () => {
  //   chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', undefined)
  //   expect(chaiHttpResponse.status).to.be.equal(500);
  // });
});
