import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ArticlesModule,
    LoggerModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
