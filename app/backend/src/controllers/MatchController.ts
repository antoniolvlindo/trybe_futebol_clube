import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getAllMatches(_req: Request, res: Response) {
    const { status, data } = await this.matchService.getAllMatches();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
