import { UnauthorizedException } from '@nestjs/common';

export class WrongCredentialDetailsException extends UnauthorizedException {
  constructor() {
    super('Wrong credentials provided.');
  }
}
