import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body, @Res({ passthrough: true }) response: Response) {
    const { telegramID, password, token } = body;
    const user = await this.authService.validateUser(
      telegramID,
      password,
      token,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    response.cookie('auth', user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 1000,
    });

    return user;
  }

  @Post('register')
  async register(@Body() body) {
    const { telegramID, name, password } = body;
    return this.authService.register(telegramID, name, password);
  }
}
