import { Application as App } from 'express';
import errorMiddleware from '../middlewares/error.middleware';
import loginController from '../controllers/login.controller';
import loginCheck from '../middlewares/loginCheck.middleware';

const Routes = (app: App) => {
  app.post('/login', loginCheck.checkLogInfo, loginController.login);
  app.get('/login/validate', loginController.authLogin);
  // app.get('/teams');

  app.use(errorMiddleware);
};

export default Routes;
