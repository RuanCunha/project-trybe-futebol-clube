import MatchModel from '../database/models';
import { queryHome, queryAway } from './queries'

const leaderboardHome = async () => {
  const [leaderboard] = await MatchModel.query(queryHome);

  return leaderboard;
};

const leaderboardAway = async () => {
  const [leaderboard] = await MatchModel.query(queryAway);

  return leaderboard;
};

export default {
  leaderboardHome,
  leaderboardAway,
};
