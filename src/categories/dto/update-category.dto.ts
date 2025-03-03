import { IsNotEmpty, IsString } from 'class-validator';
import { CanBeUndefined } from '../../Utilities/can-be-undefined';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @CanBeUndefined()
  name?: string;
}
