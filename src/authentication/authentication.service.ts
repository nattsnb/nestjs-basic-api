import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { compare, hash } from 'bcrypt';
import { WrongCredentialDetailsException } from './wrong-credential-details-exception';
import { LogInDto } from './dto/log-in.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  async signUp(signUpData: SignUpDto) {
    const saltRounds = 10;
    const hashedPassword = await hash(signUpData.password, saltRounds);

    return this.userService.create({
      name: signUpData.name,
      email: signUpData.email,
      password: hashedPassword,
    });
  }

  private async getUserByEmail(email: string) {
    try {
      return await this.userService.getByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new WrongCredentialDetailsException();
      }
      throw error;
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new WrongCredentialDetailsException();
    }
  }

  async getAuthenticatedUser(logInData: LogInDto) {
    const user = await this.getUserByEmail(logInData.email);
    await this.verifyPassword(logInData.password, user.password);
    return user;
  }
}
