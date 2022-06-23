import { Request, Response } from 'express';
import jwt from '../middlewares/jwt';
import loginService from '../services/login.service';
import TokenPayload from '../interfaces/tokenPayload.interface';
import 'express-async-errors';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService.login(email, password);

  if (result.message) {
    return res.status(401).json({ message: result.message });
  }

  return res.status(200).json(result);
};

const authLogin = async (req:Request, res: Response) => {
  const { authorization } = req.headers;
  if (typeof authorization === 'string') {
    const decoded = jwt.verifyJwt(authorization) as TokenPayload;
    const { role } = decoded.user;
    return res.status(200).json(role);
  }
  return res.status(404).json({ message: 'Deu ruim' });
};

export default {
  login,
  authLogin,
};
