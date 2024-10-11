import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();
const matchController = new MatchController();

router.get('/', (_req: Request, res: Response) => matchController.getAllMatches(_req, res));

export default router;
