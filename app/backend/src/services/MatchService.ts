import SequelizeTeam from '../database/models/SequelizeTeams';
import SequelizeMatch from '../database/models/SequelizeMatches';
import { MatchFormatted } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

const MatchFormat = (match: MatchFormatted) => {
  const matchFormatted = {
    id: match.id,
    homeTeamId: match.homeTeamId,
    homeTeamGoals: match.homeTeamGoals,
    awayTeamId: match.awayTeamId,
    awayTeamGoals: match.awayTeamGoals,
    inProgress: match.inProgress,
    homeTeam: {
      teamName: match.homeTeam.teamName,
    },
    awayTeam: {
      teamName: match.awayTeam.teamName,
    },
  };
  return matchFormatted;
};

export default class MatchService {
  private model = SequelizeMatch;

  async getAllMatches(): Promise<ServiceResponse<MatchFormatted[]>> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        { model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ] });
    const matchFormatted = matches.map((m) => MatchFormat(m as unknown as MatchFormatted));

    return { status: 'SUCCESSFUL', data: matchFormatted };
  }
}
