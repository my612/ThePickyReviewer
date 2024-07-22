import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty({example: 'John'})
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  date_created: Date;
  @ApiProperty()
  date_updated: Date;
}

export class UserDto_Update {
  @ApiProperty()
  @IsNumber()
  id: number;  
  @ApiProperty()
  @IsString()
  username?: string;
  @ApiProperty()
  @IsString()
  password?: string;
  @ApiProperty()
  @IsString()
  name?: string;
  @ApiProperty()
  date_created: Date;
  @ApiProperty()
  date_updated: Date;
}
