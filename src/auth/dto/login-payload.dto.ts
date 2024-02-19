import { Exclude } from 'class-transformer';

export class LoginPayLoadDto {
  @Exclude({ toPlainOnly: true })
  password: string;
}
