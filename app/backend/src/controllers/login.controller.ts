import { Request, Response } from 'express';
import jwt from '../middlewares/jwt';
import loginService from '../services/login.service';
import TokenPayload from '../interfaces/tokenPayload.interface';
import 'express-async-errors';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginService.login(email, password);

  if (user.message) {
    return res.status(401).json({ message: user.message });
  }

  return res.status(200).json(user);
};

const authLogin = async (req:Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(404).json({ message: 'Token not found' });
  const decoded = jwt.verifyJwt(authorization) as TokenPayload;
  const { role } = decoded.user;
  return res.status(200).json(role);
};

export default {
  login,
  authLogin,
};
