import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePhysicalUserDto {
  @ApiProperty({ example: 'AA213123' })
  @IsString()
  @IsNotEmpty()
  passport: string;

  @ApiProperty({ example: 'Nodirbek' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Qobilov' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: '12-02-1991' })
  @IsDateString()
  @IsNotEmpty()
  birth_date: Date;
}
