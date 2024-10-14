import SequelizeMatch from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeams';
import { ILeaderboard } from '../Interfaces/leaderboards/ILeaderboards';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  public static async getHomeLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const teams = await SequelizeTeam.findAll();
    const matches = await SequelizeMatch.findAll({ where: { inProgress: false } });

    const leaderboard: ILeaderboard[] = teams.map((team) => {
      const homeMatches = matches.filter((match) => match.homeTeamId === team.id);

      return LeaderboardService.createTeamStats(team.teamName, homeMatches);
    });

    return { status: 'SUCCESSFUL', data: leaderboard };
  }

  private static createTeamStats(teamName: string, homeMatches: SequelizeMatch[]): ILeaderboard {
    const totalPoints = LeaderboardService.calculateTotalPoints(homeMatches);
    const totalVictories = LeaderboardService.countVictories(homeMatches);
    const totalDraws = LeaderboardService.countDraws(homeMatches);
    const totalLosses = LeaderboardService.countLosses(homeMatches);
    const goalsFavor = homeMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    const goalsOwn = homeMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);

    return {
      name: teamName,
      totalPoints,
      totalGames: homeMatches.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
    };
  }

  private static calculateTotalPoints(matches: SequelizeMatch[]): number {
    return matches.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 3;
      if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  private static countVictories(matches: SequelizeMatch[]): number {
    return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  }

  private static countDraws(matches: SequelizeMatch[]): number {
    return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  private static countLosses(matches: SequelizeMatch[]): number {
    return matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  }
}
