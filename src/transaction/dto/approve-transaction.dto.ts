import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ApproveTransactionDto {
    @ApiProperty()
    @IsString()
    otp: number;
}