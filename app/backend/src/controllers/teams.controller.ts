import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

const getTeams = async (req: Request, res: Response) => {
  const teams = await teamsService.getTeams();

  return res.status(200).json(teams);
};

const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await teamsService.getTeamById(parseInt(id, 10));

  if (team.message) {
    return res.status(404).json({ message: team.message });
  }

  return res.status(200).json(team);
};

export default {
  getTeams,
  getTeamById,
};
