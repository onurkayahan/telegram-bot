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
    const hashedPassword = await bcrypt.hash(password, 10);

    const token = this.createToken(telegramID, name, false);

    const user = await this.userService.create({
      telegramID,
      name,
      password: hashedPassword,
      token,
    });

    delete user.id;

    return user;
  }

  createToken(telegramID: string, name: string, isAdmin: boolean) {
    return this.jwtService.sign({ telegramID, name, isAdmin });
  }
}
