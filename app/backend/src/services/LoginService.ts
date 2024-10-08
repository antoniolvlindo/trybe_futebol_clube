import { compareSync } from 'bcryptjs';
import SequelizeUser from '../database/models/SequelizeUsers';
import { ILogin, IToken } from '../Interfaces/users/IUsers';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import JWTUtils from '../utils/JWTUtils';

export default class UserService {
  private model = SequelizeUser;

  async login(loginData: ILogin): Promise<ServiceResponse<IToken>> {
    const { email, password } = loginData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password) {
      return { status: 'BADREQUEST', data: { message: 'All fields must be filled' } };
    }

    const user = await this.model.findOne({ where: { email }, raw: true });

    if (!user
      || password.length < 6 || !emailRegex.test(email) || !compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = new JWTUtils().generateToken(userWithoutPassword);
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
