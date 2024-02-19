import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
  NotContains,
} from 'class-validator';
import { IsEqualTo } from '../password';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  @IsString()
  @NotContains('@')
  username: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must be 6 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.',
    },
  )
  password: string;

  @IsEqualTo('password', { message: 'Passwords must match' })
  passwordConfirm: string;
}
