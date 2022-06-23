import { sign, SignOptions } from 'jsonwebtoken';
import { readFileSync } from 'fs';

const jwtConfig: SignOptions = {
  expiresIn: '10h',
  algorithm: 'HS256',
};

const key = readFileSync('./jwt.evaluation.key', 'utf-8');

export default (payload = {}) => sign(payload, key, jwtConfig);
