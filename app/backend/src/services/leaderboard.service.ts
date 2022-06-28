import MatchModel from '../database/models';

const query = `SELECT
name, 
  totalGames, 
  totalVictories, 
  totalLosses, 
  totalDraws, 
  goalsFavor, 
  goalsOwn,
  goalsBalance,
  totalPoints,
  CAST(CAST((totalPoints/(totalGames * 3) * 100) AS DECIMAL(10,2)) AS float) AS efficiency
FROM (
SELECT
name, 
  totalGames, 
  totalVictories, 
  totalLosses, 
  totalDraws, 
  goalsFavor, 
  goalsOwn,
  goalsFavor - goalsOwn AS goalsBalance,
  (totalVictories * 3) + (totalDraws) AS totalPoints
FROM (
SELECT 
T.team_name AS name,
COUNT(*) AS totalGames,
  SUM(CASE WHEN M.home_team_goals > M.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
  SUM(CASE WHEN M.home_team_goals < M.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
  SUM(CASE WHEN M.home_team_goals = M.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
  SUM(M.home_team_goals) AS goalsFavor,
  SUM(M.away_team_goals) AS goalsOwn
FROM TRYBE_FUTEBOL_CLUBE.matches AS M
INNER JOIN
TRYBE_FUTEBOL_CLUBE.teams AS T
ON M.home_team = T.id
WHERE in_progress = 0
GROUP BY T.team_name) AS T1) AS T2
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsOwn DESC`;

const leaderboardHome = async () => {
  const [leaderboard] = await MatchModel.query(query);

  return leaderboard;
};

export default {
  leaderboardHome,
};
