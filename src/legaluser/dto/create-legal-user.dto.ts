import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsAlphanumeric, IsDate } from 'class-validator';

export class CreateLegalUserDto {
    @ApiProperty({ example: "Najot ta'lim", description: 'Company name' })
    @IsNotEmpty()
    @IsString()
    company_name: string;

    @ApiProperty({ example: 'Full name', description: 'Full name of the legal user' })
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @ApiProperty({ example: 'AA213123', description: 'Passport number' })
    @IsNotEmpty()
    @IsAlphanumeric()
    passport: string;

    @ApiProperty({ example: '998900249424',description: 'phone of CEO'})
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ example: 'usernamenodirbek@gmail.com',description: 'email of user'})
    @IsNotEmpty()
    @IsString()
    email: string;
}
