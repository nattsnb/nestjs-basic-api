import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const secret = 'very-secret-string';

const twelveHours = 43200;

const jwtSecret = new JwtService({
  signOptions: {
    expiresIn: twelveHours,
  },
});

const dataToEncode = {
  userId: 1,
};

const token = jwtSecret.sign(dataToEncode, {
  secret,
});
console.log(token);

const decodedData = jwtSecret.verify(token, {
  secret,
});

console.log(decodedData);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
