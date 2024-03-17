import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { CreatePhysicalUserDto } from "src/physicaluser/dto/create-physical-user.dto";
import { TypePlasticCardEnum } from "src/utils/credit-cards.enum";

export class createPlasticCardUserDto extends CreatePhysicalUserDto {
    @ApiProperty({ description: 'Bank ID' })
    @IsNumber()
    bank_id: number;
  
    @ApiProperty({ description: 'Type of plastic card' })
    @IsEnum(TypePlasticCardEnum)
    type_card: TypePlasticCardEnum;

    @ApiProperty({description: 'Phone_number of card'})
    @IsString()
    phone_number: string;
}