import { sign, SignOptions, verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

const jwtConfig: SignOptions = {
  expiresIn: '10h',
  algorithm: 'HS256',
};

const key = readFileSync('./jwt.evaluation.key', 'utf-8');

const signJwt = (payload = {}) => sign(payload, key, jwtConfig);

const verifyJwt = (payload: string) => verify(payload, key);

export default {
  signJwt,
  verifyJwt,
};
