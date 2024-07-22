import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilmDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  date_created: Date;
  @ApiProperty()
  date_updated: Date;

}

export class FilmDto_Update {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsNumber()
  year?: number;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  date_created: Date;
  @ApiProperty()
  date_updated: Date;
}
