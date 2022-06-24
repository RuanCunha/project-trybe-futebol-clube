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

export default {
  getMatches,
  getMatchesByProgress,
};
