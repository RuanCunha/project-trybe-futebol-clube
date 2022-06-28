import { Application as App } from 'express';
import errorMiddleware from '../middlewares/error.middleware';
import loginController from '../controllers/login.controller';
import teamsController from '../controllers/teams.controller';
import matchController from '../controllers/match.controller';
import leaderboardController from '../controllers/leaderboard.controller';
import loginCheck from '../middlewares/loginCheck.middleware';

const Routes = (app: App) => {
  app.post('/login', loginCheck.checkLogInfo, loginController.login);
  app.get('/login/validate', loginController.authLogin);
  app.get('/teams', teamsController.getTeams);
  app.get('/teams/:id', teamsController.getTeamById);

  app.get('/matches', matchController.getMatches);
  app.post('/matches', matchController.insertMatch);
  app.patch('/matches/:id/finish', matchController.finishMatch);
  app.patch('/matches/:id', matchController.editMatch);

  app.get('/leaderboard/home', leaderboardController.leaderboardHome);
  app.get('/leaderboard/away', leaderboardController.leaderboardAway);

  app.use(errorMiddleware);
};

export default Routes;
