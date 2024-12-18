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

const inProgressTrue = {
  where: { inProgress: true },
  include: [
    { model: SequelizeTeam,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    { model: SequelizeTeam,
      as: 'awayTeam',
      attributes: ['teamName'],
    },
  ],
};

const inProgressFalse = {
  where: { inProgress: false },
  include: [
    { model: SequelizeTeam,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    { model: SequelizeTeam,
      as: 'awayTeam',
      attributes: ['teamName'],
    },
  ],
};

interface UpdateMatch {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number
}

interface NewMatch {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number
}

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

  async getMatchesInProgress(inProgress: string): Promise<ServiceResponse<MatchFormatted[]>> {
    if (inProgress === 'true') {
      const matches = await this.model.findAll(inProgressTrue);
      const matchFormatted = matches.map((m) => MatchFormat(m as unknown as MatchFormatted));
      return { status: 'SUCCESSFUL', data: matchFormatted };
    }
    const matches = await this.model.findAll(inProgressFalse);
    const matchFormatted = matches.map((m) => MatchFormat(m as unknown as MatchFormatted));

    return { status: 'SUCCESSFUL', data: matchFormatted };
  }

  async finishMatch(id: number) {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatch({ id, homeTeamGoals, awayTeamGoals }: UpdateMatch) {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { status: 'SUCCESSFUL', data: { message: 'updated' } };
  }

  async createMatch(match: NewMatch) {
    const newMatch = {
      ...match,
      inProgress: true,
    };
    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      return { status: 'INVALIDVALUE',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const ids = [match.homeTeamId, match.awayTeamId];
    const teams = await Promise.all(ids.map((id) =>
      SequelizeTeam.findOne({ where: { id }, raw: true })));

    if (teams.some((team) => team === null)) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatchCreated = await this.model.create(newMatch, { raw: true });

    return { status: 'CREATED', data: newMatchCreated };
  }
}
