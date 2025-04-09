import { IsNotEmpty, Matches } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Role name can not be empty.' })
  @Matches(/^[A-Za-z]+$/, {
    message:
      'Role name can only contain English alphabets (A-Z, a-z) with no spaces.',
  })
  role_name: string;
}
