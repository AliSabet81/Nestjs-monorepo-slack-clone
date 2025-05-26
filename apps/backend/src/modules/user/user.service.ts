import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async findOne({ email }: FindUserDto) {
    return await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
