import { Request, Response } from 'express';
import loginService from '../services/login.service';
import 'express-async-errors';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService.login(email, password);

  if (result.message) {
    return res.status(401).json({ message: result.message });
  }

  return res.status(200).json(result);
};

export default {
  login,
};
