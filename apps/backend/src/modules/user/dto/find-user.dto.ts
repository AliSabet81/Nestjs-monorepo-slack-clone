import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '@prisma/client';

export class FindUserDto implements Pick<User, 'email'> {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
