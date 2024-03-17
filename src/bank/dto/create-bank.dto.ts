import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBankDto {
    @ApiProperty({example: 'Sanoat qurilish bank',description:'name of bank'})
    @IsString({message: 'bank_name need to be string'})
    readonly bank_name: string;
}