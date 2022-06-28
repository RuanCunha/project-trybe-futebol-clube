import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const leaderboardHome = async (req: Request, res: Response) => {
  const leaderboard = await leaderboardService.leaderboardHome();

  return res.status(200).json(leaderboard);
};

const leaderboardAway = async (req: Request, res: Response) => {
  const leaderboard = await leaderboardService.leaderboardAway();

  return res.status(200).json(leaderboard);
};

export default {
  leaderboardHome,
  leaderboardAway,
};
