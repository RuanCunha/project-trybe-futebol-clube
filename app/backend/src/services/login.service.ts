// import { readFileSync } from 'fs';
// import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import UserModel from '../database/models/user';
import tokenGen from '../middlewares/jwt';

const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ where: { email } });

  if (!user || !compareSync(password, user.password)) {
    return { message: 'Incorrect email or password' };
  }

  const payload = { id: user.id, username: user.username, role: user.role, email: user.email };
  // const token = tokenGen({ payload });
  // return { payload, result: token };

  const token = tokenGen({ user });

  return { user: payload, token };

  // if (result) {
  //   // const { password, ...payload } = result;
  //   // const token = tokenGen(payload)
  //   // return { payload, token };
  //   return { result };
  // }

  // return { message: 'Incorrect email or password' };
};

export default {
  login,
};
