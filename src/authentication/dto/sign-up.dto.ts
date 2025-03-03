import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CanBeUndefined } from '../../Utilities/can-be-undefined';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string | null;

  @CanBeUndefined()
  @Type(() => AddressDto)
  @IsObject()
  @ValidateNested()
  address?: AddressDto;
}
