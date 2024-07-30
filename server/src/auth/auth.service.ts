import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    telegramID: string,
    pass: string,
    token: string,
  ): Promise<any> {
    const user = await this.userService.findOne(telegramID, token);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { id, password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(telegramID: string, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 5);

    const payload = { telegramID, name };
    const token = this.jwtService.sign(payload);

    const user = await this.userService.create({
      telegramID,
      name,
      password: hashedPassword,
      token,
    });

    delete user.id;

    return user;
  }
}
