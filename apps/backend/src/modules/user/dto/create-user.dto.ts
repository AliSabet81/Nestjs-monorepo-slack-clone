import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '@prisma/client';

export class CreateUserDto implements Pick<User, 'name' | 'email'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
