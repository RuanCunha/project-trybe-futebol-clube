import { Application as App } from 'express';
import errorMiddleware from '../middlewares/error.middleware';
import loginController from '../controllers/login.controller';
import validateLogin from '../middlewares/loginCheck.middleware';

const Routes = (app: App) => {
  app.post('/login', validateLogin, loginController.login);

  app.use(errorMiddleware);
};

export default Routes;
