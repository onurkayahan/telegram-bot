import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeederService {
  constructor(private readonly userService: UserService) {}

  async seed() {
    const predefinedRow = await this.userService.findOne('admin');

    const hashedPassword = await bcrypt.hash('admin', 5);

    if (!predefinedRow) {
      const adminUser = {
        telegramID: 'admin',
        name: 'admin',
        password: hashedPassword, // password: admin
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWxlZ3JhbUlEIjoiYWRtaW4iLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjIxNzMwNjEsImV4cCI6MzYwMDAxNzIyMTczMDYxfQ.jlbaWAJAWSeQL2lZi8SuNm2fDRHrlEf4MO-p2XOvgKE',
        isAdmin: true,
      };

      // await this.userService.create(adminUser);
      return true;
    }
    return false;
  }
}
