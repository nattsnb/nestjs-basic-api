import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  street: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country: string;
}
