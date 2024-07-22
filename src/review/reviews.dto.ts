import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsString,
} from 'class-validator';

export class ReviewDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
  @ApiProperty()
  @IsNumber()
  film_id: number;

  @ApiProperty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  date_created: Date;
}
