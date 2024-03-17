import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateAccountNumberDto {
    @ApiProperty({ description: 'Bank ID' })
    @IsInt({ message: 'Bank ID must be an integer' })
    bank_id: number;

    @ApiProperty({ description: 'User ID' })
    @IsInt({ message: 'User ID must be an integer' })
    user_id: number;
}
