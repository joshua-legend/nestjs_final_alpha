import { IsString, IsNumber, Min, MaxLength, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBreadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;
}
