import { Router, Request, Response, NextFunction } from 'express';
import LoginController from '../controllers/LoginController';
import Auth from '../middlewares/authentication.middleware';

const router = Router();
const loginController = new LoginController();

router.post('/', (req: Request, res: Response) => loginController.login(req, res));
router.get(
  '/role',
  (req: Request, res: Response, next: NextFunction) => new Auth(req, res, next).auth(),
  (req: Request, res: Response) => loginController.getRole(req, res),
);

export default router;
