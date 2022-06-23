// import { readFileSync } from 'fs';
// import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import UserModel from '../database/models/user';
import jwt from '../middlewares/jwt';

const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ where: { email } });

  if (!user || !compareSync(password, user.password)) {
    return { message: 'Incorrect email or password' };
  }

  const payload = { id: user.id, username: user.username, role: user.role, email: user.email };
  const token = jwt.signJwt({ user });

  return { user: payload, token };
};

export default {
  login,
};
