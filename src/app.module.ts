import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ArticlesModule,
    AuthenticationModule,
    LoggerModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
