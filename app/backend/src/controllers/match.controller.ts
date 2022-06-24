import { Request, Response } from 'express';
import MatchModel from '../services/match.service';

const getMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress) {
    const matches = await MatchModel.getMatchesByProgress(String(inProgress));
    return res.status(200).json(matches);
  }

  const matches = await MatchModel.getMatches();
  return res.status(200).json(matches);
};

export default {
  getMatches,
};
