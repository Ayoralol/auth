import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../users/entities/user.entity';
import { generate } from 'rxjs';
import { generateHash } from '../auth/password';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const hashedPassword = await generateHash('Password1!');
    em.create(User, {
      email: 'test@test.com',
      username: 'testUser',
      password: hashedPassword,
    });
  }
}
