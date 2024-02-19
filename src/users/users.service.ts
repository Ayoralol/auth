import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }

  async create(data: User): Promise<User> {
    const newUser = plainToInstance(User, data);
    await this.userRepository.getEntityManager().persistAndFlush(newUser);
    return newUser;
  }
}
