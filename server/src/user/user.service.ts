import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(telegramID: string, token?: string): Promise<User> {
    return await this.userRepository.findOneBy({ telegramID, token });
  }

  create(user: any): Promise<User> {
    user.createdAt = moment().toDate();
    return this.userRepository.save(user);
  }
}
