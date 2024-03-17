import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsDate, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { TypePlasticCardEnum } from 'src/utils/credit-cards.enum';

export class CreatePlasticCardDto {
  @ApiProperty({ description: 'Bank ID' })
  @IsNumber()
  bank_id: number;

  @ApiProperty({ description: 'User ID' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Type of plastic card' })
  @IsEnum(TypePlasticCardEnum)
  type_card: TypePlasticCardEnum;

  @ApiProperty({description: 'Phone_number of card'})
  @IsString()
  phone_number: string;
}
