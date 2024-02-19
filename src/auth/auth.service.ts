import { ConflictException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { generateHash, validateHash } from './password';
import { plainToInstance } from 'class-transformer';
import { LoginPayLoadDto } from './dto/login-payload.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDetails: LoginDto) {
    // see if this is actually a registered user
    // find the user by email in db
    const { email, password } = loginDetails;

    const foundUser = await this.userService.findByEmail(email);

    const passwordsMatch = validateHash(password, foundUser.password);

    if (!passwordsMatch) {
      return null;
    }

    const { password: foundPass, ...rest } = foundUser;

    const token = await this.jwtService.sign({ sub: foundUser.id });

    return token;
  }

  async register(registerData: RegisterDto) {
    const { email, username, password } = registerData;

    const foundEmail = await this.userService.findByEmail(email);
    const foundUsername = await this.userService.findByUsername(username);

    if (foundEmail || foundUsername) {
      throw new ConflictException('Email or Username already exists');
    }

    const hashedPassword = await generateHash(password);

    const newUser = await this.userService.create({
      email,
      username,
      password: hashedPassword,
      id: null,
    });

    const { password: foundPass, ...rest } = newUser;

    return rest;
  }
}
