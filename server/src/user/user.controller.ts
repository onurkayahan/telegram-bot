import {
  Controller,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Req() req): Promise<User[]> {
    const userTelegramID = req.user.telegramID;

    const user = await this.userService.findOne(userTelegramID);
    if (user.isAdmin) {
      return this.userService.findAll();
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req): Promise<User> {
    const userTelegramID = req.user.telegramID;
    return this.userService.findOne(userTelegramID);
  }
}
