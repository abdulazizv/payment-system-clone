import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreatePlasticCardDto } from "./create-plasticcard.dto";
import { IsNumber, IsOptional } from "class-validator";

export class UpdatePlasticCardDto extends PartialType(CreatePlasticCardDto) { 
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    amount: number;
}