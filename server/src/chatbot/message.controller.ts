import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async handleMessage(@Body() createMessageDto: CreateMessageDto, @Req() req) {
    return this.messageService.processMessage(createMessageDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMessages(@Req() req) {
    return this.messageService.getMessages(req.user);
  }
}
