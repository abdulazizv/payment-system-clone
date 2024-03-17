import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreatePlasticCardDto } from "./create-plasticcard.dto";

export class UpdatePlasticCardDto extends PartialType(CreatePlasticCardDto) { 
}