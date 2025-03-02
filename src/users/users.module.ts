import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [LoggerModule, DatabaseModule],
})
export class UsersModule {}
