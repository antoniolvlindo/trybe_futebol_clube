import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../services/LoginService';

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
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getRole(req: Request, res: Response) {
    this.role = req.body.user.role;
    return res.status(200).json({ role: this.role });
  }
}
