import Match from '../interfaces/match.interface';
import MatchModel from '../database/models/match';
import Team from '../database/models/team';

const getMatches = async () => {
  const matches = await MatchModel.findAll({
    include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
  });

  return matches;
};

const getMatchesByProgress = async (inProgress: string) => {
  if (inProgress === 'true') {
    const matches = await MatchModel.findAll({
      where: { inProgress: true },
      include:
        [
          { model: Team, as: 'teamHome', attributes: ['teamName'] },
          { model: Team, as: 'teamAway', attributes: ['teamName'] },
        ] });
    return matches;
  }
  const matches = await MatchModel.findAll({
    where: { inProgress: false },
    include:
      [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ] });
  return matches;
};

const insertMatch = async (match: Match) => {
  const checkHome = await Team.findByPk(match.homeTeam);
  const checkAway = await Team.findByPk(match.awayTeam);

  if (!checkHome || !checkAway) return 'notFound';

  const createdMatch = await MatchModel.create({ ...match, inProgress: true });

  return createdMatch;
};

const finishMatch = async (id: number) => {
  const test = await MatchModel.update({ inProgress: false }, { where: { id } });
  console.log(test);
};

const editMatch = async (match: Match, id: number) => {
  const { homeTeamGoals, awayTeamGoals } = match;
  const updatedMatch = await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

  return updatedMatch;
};

export default {
  getMatches,
  getMatchesByProgress,
  insertMatch,
  finishMatch,
  editMatch,
};
