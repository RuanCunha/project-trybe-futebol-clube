import { Response, Request, NextFunction } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

  next();
};

export default validateLogin;
