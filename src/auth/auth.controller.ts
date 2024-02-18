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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDetails: LoginDto): Promise<User> {
    console.log(loginDetails);
    const user = await this.authService.login(loginDetails);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }
}
