import SequelizeMatch from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeams';
import { ILeaderboard } from '../Interfaces/leaderboards/ILeaderboards';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  public static async getHomeLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const teams = await SequelizeTeam.findAll();
    const matches = await SequelizeMatch.findAll({ where: { inProgress: false } });

    const leaderboard = this.generateLeaderboard(teams, matches);
    const sortedLeaderboard = this.sortLeaderboard(leaderboard);

    return { status: 'SUCCESSFUL', data: sortedLeaderboard };
  }

  public static async getAwayLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const teams = await SequelizeTeam.findAll();
    const matches = await SequelizeMatch.findAll({ where: { inProgress: false } });

    const leaderboard = this.generateAwayLeaderboard(teams, matches);
    const sortedLeaderboard = this.sortLeaderboard(leaderboard);

    return { status: 'SUCCESSFUL', data: sortedLeaderboard };
  }

  public static async getCombinedLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const teams = await SequelizeTeam.findAll();
    const matches = await SequelizeMatch.findAll({ where: { inProgress: false } });

    const homeLeaderboard = this.generateLeaderboard(teams, matches);
    const awayLeaderboard = this.generateAwayLeaderboard(teams, matches);

    const combinedLeaderboard = teams.map((team) => {
      const homeStats = homeLeaderboard.find((t) => t.name === team.teamName);
      const awayStats = awayLeaderboard.find((t) => t.name === team.teamName);

      return {
        name: team.teamName,
        totalPoints: (homeStats?.totalPoints || 0) + (awayStats?.totalPoints || 0),
        totalGames: (homeStats?.totalGames || 0) + (awayStats?.totalGames || 0),
        totalVictories: (homeStats?.totalVictories || 0) + (awayStats?.totalVictories || 0),
        totalDraws: (homeStats?.totalDraws || 0) + (awayStats?.totalDraws || 0),
        totalLosses: (homeStats?.totalLosses || 0) + (awayStats?.totalLosses || 0),
        goalsFavor: (homeStats?.goalsFavor || 0) + (awayStats?.goalsFavor || 0),
        goalsOwn: (homeStats?.goalsOwn || 0) + (awayStats?.goalsOwn || 0),
        goalsBalance: ((homeStats?.goalsFavor || 0) + (awayStats?.goalsFavor || 0)) - ((homeStats?.goalsOwn || 0) + (awayStats?.goalsOwn || 0)),
        efficiency: this.calculateEfficiency(
          (homeStats?.totalPoints || 0) + (awayStats?.totalPoints || 0),
          (homeStats?.totalGames || 0) + (awayStats?.totalGames || 0)
        ),
      };
    });

    const sortedCombinedLeaderboard = this.sortLeaderboard(combinedLeaderboard);

    return { status: 'SUCCESSFUL', data: sortedCombinedLeaderboard };
  }

  private static generateLeaderboard(
    teams: SequelizeTeam[],
    matches: SequelizeMatch[],
  ): ILeaderboard[] {
    return teams.map((team) => {
      const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
      return this.createTeamStats(team.teamName, homeMatches);
    });
  }

  private static generateAwayLeaderboard(
    teams: SequelizeTeam[],
    matches: SequelizeMatch[],
  ): ILeaderboard[] {
    return teams.map((team) => {
      const awayMatches = matches.filter((match) => match.awayTeamId === team.id);
      return this.createTeamStats(team.teamName, awayMatches);
    });
  }

  static sortLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    return leaderboard.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return a.name.localeCompare(b.name);
    });
  }

  private static createTeamStats(teamName: string, matches: SequelizeMatch[]): ILeaderboard {
    const basicStats = this.calculateBasicStats(matches);
    const goals = this.calculateGoals(matches);
    return {
      name: teamName,
      ...basicStats,
      ...goals,
      goalsBalance: this.calculateGoalsBalance(goals),
      efficiency: this.calculateEfficiency(basicStats.totalPoints, matches.length),
    };
  }

  private static calculateBasicStats(matches: SequelizeMatch[]) {
    return {
      totalPoints: this.calculateTotalPoints(matches),
      totalVictories: this.countMatches(matches, (m) => m.homeTeamGoals > m.awayTeamGoals),
      totalDraws: this.countMatches(matches, (m) => m.homeTeamGoals === m.awayTeamGoals),
      totalLosses: this.countMatches(matches, (m) => m.homeTeamGoals < m.awayTeamGoals),
      totalGames: matches.length,
    };
  }

  private static calculateGoals(matches: SequelizeMatch[]) {
    return {
      goalsFavor: this.sumGoals(matches, 'homeTeamGoals'),
      goalsOwn: this.sumGoals(matches, 'awayTeamGoals'),
    };
  }

  private static sumGoals(
    matches: SequelizeMatch[],
    field: 'homeTeamGoals' | 'awayTeamGoals',
  ): number {
    return matches.reduce((acc, match) => acc + match[field], 0);
  }

  private static calculateGoalsBalance({ goalsFavor, goalsOwn }: {
    goalsFavor: number; goalsOwn: number
  }): number {
    return goalsFavor - goalsOwn;
  }

  private static calculateEfficiency(totalPoints: number, totalGames: number): string {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return efficiency.toFixed(2);
  }

  private static calculateTotalPoints(matches: SequelizeMatch[]): number {
    return matches.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 3;
      if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  private static countMatches(
    matches: SequelizeMatch[],
    condition: (match: SequelizeMatch) => boolean,
  ): number {
    return matches.filter(condition).length;
  }
}
