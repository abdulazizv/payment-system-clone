import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { CreateLegalUserDto } from "src/legaluser/dto/create-legal-user.dto";

export class CreateAccountNumberUserDto extends CreateLegalUserDto {
    @ApiProperty({ description: 'Bank ID' })
    @IsInt({ message: 'Bank ID must be an integer' })
    bank_id: number;
}