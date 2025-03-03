import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [LoggerModule, DatabaseModule],
})
export class UsersModule {}
