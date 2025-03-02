import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UserNotFoundException } from './user-not-found-exception';
import { UserDto } from './user.dto';
import { PrismaError } from '../database/prisma-error.enum';
import { Prisma } from '@prisma/client';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService,
  ) {}

  async getByEmail(email: string) {
    this.loggerService.log(`Getting user with email ${email}.`);
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      this.loggerService.warn("User with this email doesn't exist.");
      throw new UserNotFoundException();
    }
    return user;
  }

  async getById(id: number) {
    this.loggerService.log(`Getting user with id ${id}.`);
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      this.loggerService.warn("User with this id doesn't exist.");
      throw new UserNotFoundException();
    }
    return user;
  }

  async create(user: UserDto) {
    this.loggerService.log(`Creating new user.`);
    try {
      return await this.prismaService.user.create({
        data: user,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error?.code === PrismaError.UniqueConstraintViolated
      ) {
        throw new ConflictException('User with this email already exists');
      }
    }
  }
}
