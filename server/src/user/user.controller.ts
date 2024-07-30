import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req): Promise<User[]> {
    console.log(req);
    return this.userService.findAll();
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req): Promise<User> {
    const userTelegramID = req.user.telegramID;
    return this.userService.findOne(userTelegramID);
  }
}
