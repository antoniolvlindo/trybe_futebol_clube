import { Request, Response, NextFunction } from 'express';
import JWTUtils from '../utils/JWTUtils';

type NewRequest = Request & {
  user?: any
};

export default class Auth {
  private authorization: string | undefined;
  private req: NewRequest;
  private res: Response;
  private next: NextFunction;
  private jwt = new JWTUtils();
  constructor(req: NewRequest, res: Response, next: NextFunction) {
    this.authorization = req.headers.authorization;
    this.req = req;
    this.res = res;
    this.next = next;
  }

  auth() {
    if (!this.authorization) {
      return this.res.status(401).json({ message: 'Token not found' });
    }
    try {
      const token = this.authorization.split(' ')[1];
      const user = this.jwt.validateToken(token);
      if (!user) {
        return this.res.status(401).json({ message: 'Token must be a valid token' });
      }
      this.req.user = user;
      this.next();
    } catch (e) {
      return this.res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
