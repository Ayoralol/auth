import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { LoginPayLoadDto } from './dto/login-payload.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDetails: LoginDto): Promise<Partial<User>> {
    console.log(loginDetails);
    const user = await this.authService.login(loginDetails);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    // const userWIthNoPass = plainToInstance(LoginPayLoadDto, user);
    return user;
  }

  @Post('/register')
  async register(@Body() registerDetails: RegisterDto): Promise<Partial<User>> {
    return await this.authService.register(registerDetails);
  }
}
