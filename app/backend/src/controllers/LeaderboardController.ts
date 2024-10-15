import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public static async getHomeLeaderboard(_req: Request, res: Response) {
    try {
      const { data } = await LeaderboardService.getHomeLeaderboard();
      res.status(200).json(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error' });
      }
    }
  }

  public static async getAwayLeaderboard(_req: Request, res: Response) {
    try {
      const { data } = await LeaderboardService.getAwayLeaderboard();
      res.status(200).json(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error' });
      }
    }
  }
}
