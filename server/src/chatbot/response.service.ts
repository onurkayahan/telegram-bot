import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ResponseService {
  constructor() {}

  private responses = {
    '/hello': 'Hello! How can I assist you today?',
    '/helloadmin': 'Hi there! How can I help you?',
  };

  async generateResponse(message: Message, user: User) {
    // Generate a response based on the message content
    const responseText = this.getResponse(message.content);
    const response = `${responseText} ${user.name}`;
    return response;
  }

  getResponse(content: string): string {
    const lowerCaseContent = content.toLowerCase();
    return (
      this.responses[lowerCaseContent] || 'Sorry, I do not understand that.'
    );
  }
}
