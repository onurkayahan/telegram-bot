import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async seed() {
    const predefinedRow = await this.userService.findOne('admin');

    const hashedPassword = await bcrypt.hash('admin', 10);

    if (!predefinedRow) {
      const adminUser: any = {
        telegramID: 'admin',
        name: 'admin',
        password: hashedPassword, // password: admin
        isAdmin: true,
      };

      // token can be found in db
      adminUser.token = this.authService.createToken(
        adminUser.telegramID,
        adminUser.name,
        adminUser.isAdmin,
      );

      await this.userService.create(adminUser);
      return true;
    }
    return false;
  }
}
