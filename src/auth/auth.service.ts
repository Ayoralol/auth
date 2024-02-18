import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { generateHash, validateHash } from './password';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async login(loginDetails: LoginDto) {
    // see if this is actually a registered user
    // find the user by email in db
    const { email, password } = loginDetails;

    const foundUser = await this.userService.findByEmail(email);

    const passwordsMatch = validateHash(password, foundUser.password);

    if (!passwordsMatch) {
      return null;
    }

    return foundUser;
  }
}
