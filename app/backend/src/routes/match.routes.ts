import { Request, Router, Response, NextFunction } from 'express';
import MatchController from '../controllers/MatchController';
import Auth from '../middlewares/authentication.middleware';

const router = Router();
const matchController = new MatchController();

router.get('/', (_req: Request, res: Response) => matchController.getAllMatches(_req, res));
router.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => new Auth(req, res, next).auth(),
  (_req: Request, res: Response) => matchController.finishMatch(_req, res),
);

export default router;
