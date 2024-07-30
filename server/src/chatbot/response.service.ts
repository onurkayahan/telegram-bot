import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ResponseService {
  constructor() {}

  private responses = {
    '/hello': 'Hello',
    '/hi': 'Hi',
  };

  async generateResponse(message: Message, user: User) {
    if (user.isAdmin && message.content === '/helloadmin') {
      return 'Hello from admin!';
    }
    // Generate a response based on the message content
    const responseText = this.getResponse(message.content);

    return `${responseText} ${user.name}!`;
  }

  getResponse(content: string): string {
    const lowerCaseContent = content.toLowerCase();
    return (
      this.responses[lowerCaseContent] || 'Sorry, I do not understand that.'
    );
  }
}
