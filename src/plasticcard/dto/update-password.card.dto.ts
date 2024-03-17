import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdatePasswordCardDto {
    @ApiProperty({example:'1111',description: 'password of card'})
    @IsNumber()
    password: number;
}