import {Exclude, Transform} from "class-transformer";
import {User} from "@prisma/client";

export class AuthenticationResponseDto implements User {
  id: number;
  email: string;
  name: string;

  @Transform(( {value: phoneNumber}) => {
    if (!phoneNumber) {
      return null;
    }
    const numberLength = phoneNumber.length;
    const visiblePart = phoneNumber.substring(numberLength - 3, numberLength);
    return `${'*'.repeat(numberLength - 3)}${visiblePart}`;
  })
  phoneNumber: string;

  @Exclude()
  password: string;
}