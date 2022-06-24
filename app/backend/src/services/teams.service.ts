import TeamModel from '../database/models/team';

const getTeams = async () => {
  const teams = await TeamModel.findAll();

  return teams;
};

const getTeamById = async (id: number) => {
  const team = await TeamModel.findByPk(id);

  if (!team) {
    return { message: 'No team found' };
  }

  return { team };
};

export default {
  getTeams,
  getTeamById,
};
