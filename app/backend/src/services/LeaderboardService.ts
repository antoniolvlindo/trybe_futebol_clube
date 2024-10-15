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

    const sortedLeaderboard = leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);

    return { status: 'SUCCESSFUL', data: sortedLeaderboard };
  }

  private static createTeamStats(teamName: string, homeMatches: SequelizeMatch[]): ILeaderboard {
    const {
      totalPoints, totalVictories, totalDraws, totalLosses,
    } = this.calculateBasicStats(homeMatches);

    const { goalsFavor, goalsOwn } = this.calculateGoals(homeMatches);
    return {
      name: teamName,
      totalPoints,
      totalGames: homeMatches.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: this.calculateGoalsBalance(goalsFavor, goalsOwn),
      efficiency: this.calculateEfficiency(totalPoints, homeMatches.length),
    };
  }

  private static calculateBasicStats(homeMatches: SequelizeMatch[]) {
    return {
      totalPoints: this.calculateTotalPoints(homeMatches),
      totalVictories: this.countVictories(homeMatches),
      totalDraws: this.countDraws(homeMatches),
      totalLosses: this.countLosses(homeMatches),
    };
  }

  private static calculateGoals(homeMatches: SequelizeMatch[]) {
    return {
      goalsFavor: this.sumGoals(homeMatches, 'homeTeamGoals'),
      goalsOwn: this.sumGoals(homeMatches, 'awayTeamGoals'),
    };
  }

  private static sumGoals(
    matches: SequelizeMatch[],
    field: 'homeTeamGoals' | 'awayTeamGoals',
  ): number {
    return matches.reduce((acc, match) => acc + match[field], 0);
  }

  private static calculateGoalsBalance(goalsFavor: number, goalsOwn: number): number {
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
