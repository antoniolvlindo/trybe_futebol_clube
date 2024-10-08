import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../services/LoginService';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
  } | undefined;
}

export default class LoginController {
  private loginService: LoginService;
  private role: string;

  constructor() {
    this.loginService = new LoginService();
    this.role = '';
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.login({ email, password });
    return res.status(mapStatusHTTP(status as keyof typeof mapStatusHTTP)).json(data);
  }

  async getRole(req: AuthenticatedRequest, res: Response) {
    if (req.user) {
      this.role = req.user.role;
    } else {
      return res.status(400).json({ message: 'User not authenticated' });
    }
    return res.status(200).json({ role: this.role });
  }
}
