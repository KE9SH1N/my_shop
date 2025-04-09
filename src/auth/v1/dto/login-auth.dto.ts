import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  password: string;
}
