import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getAllMatches(_req: Request, res: Response) {
    const { inProgress } = _req.query;
    if (inProgress) {
      const { status, data } = await this.matchService.getMatchesInProgress(String(inProgress));
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchService.getAllMatches();
    res.status(mapStatusHTTP(status)).json(data);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService.updateMatch({
      id: Number(id),
      homeTeamGoals,
      awayTeamGoals,
    });
    res.status(mapStatusHTTP(status)).json(data);
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService.createMatch({
      homeTeamGoals,
      awayTeamGoals,
      homeTeamId,
      awayTeamId,
    });
    res.status(mapStatusHTTP(status)).json(data);
  }
}
