import { ITeam } from '../Interfaces/teams/ITeam';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  private teamModel: typeof SequelizeTeams;

  constructor() {
    this.teamModel = SequelizeTeams;
  }

  public async getAllTeam(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll({ raw: true });
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findByPk(id);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}
