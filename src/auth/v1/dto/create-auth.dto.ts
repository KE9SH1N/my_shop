import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  user_id: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(32, {
    message: 'Password must be not more than 16 characters long',
  })
  // Passwords will contain at least 1 upper case letter
  // Passwords will contain at least 1 lower case letter
  // Passwords will contain at least 1 number or special character
  // There is no length validation (min, max) in this regex!
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain at least 1 upper case, 1 lower case, 1 number or special character',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  role_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
