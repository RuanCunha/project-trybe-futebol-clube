import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const leaderboardHome = async (req: Request, res: Response) => {
  const leaderboard = await leaderboardService.leaderboardHome();

  return res.status(200).json(leaderboard);
};

export default {
  leaderboardHome,
};
