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

const insertMatch = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const match = await MatchModel.insertMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });
  if (typeof match === 'string') {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  return res.status(201).json(match);
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await MatchModel.finishMatch(parseInt(id, 10));

  return res.status(200).json({ message: 'Finished' });
};

export default {
  getMatches,
  insertMatch,
  finishMatch,
};
