import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { ResponseService } from './response.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../user/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly responseService: ResponseService,
  ) {}

  async processMessage(createMessageDto: CreateMessageDto, user: User) {
    const message = this.messageRepository.create(createMessageDto);
    const response = await this.responseService.generateResponse(message, user);
    return await this.messageRepository.save({
      ...message,
      response,
      telegramID: user.telegramID,
    });
  }

  async getMessages(user: User) {
    const messages = this.messageRepository.findBy({
      telegramID: user.telegramID,
    });

    return messages;
  }
}
