export interface ITeam {
  teamName: string;
}

export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: ITeam;
  awayTeam: ITeam;
}

export interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface MatchFormatted extends IMatches {
  homeTeam: {
    teamName: string,
  },
  awayTeam: {
    teamName:string,
  },
}
