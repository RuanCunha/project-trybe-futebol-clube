import { Request, Response } from 'express';
import MatchService from '../services/match.service';

const getMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress) {
    const matches = await MatchService.getMatchesByProgress(String(inProgress));
    return res.status(200).json(matches);
  }

  const matches = await MatchService.getMatches();
  return res.status(200).json(matches);
};

const insertMatch = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const match = await MatchService
    .insertMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });
  if (typeof match === 'string') {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  return res.status(201).json(match);
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await MatchService.finishMatch(parseInt(id, 10));

  return res.status(200).json({ message: 'Finished' });
};

const editMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  await MatchService
    .editMatch(
      {
        homeTeamGoals: parseInt(homeTeamGoals, 10),
        awayTeamGoals: parseInt(awayTeamGoals, 10),
      },
      parseInt(id, 10),
    );
  return res.status(200).json({ message: 'Match updated' });
};

export default {
  getMatches,
  insertMatch,
  finishMatch,
  editMatch,
};
