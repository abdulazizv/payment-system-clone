import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class TransactionAccountNumberDto {
    @ApiProperty()
    @IsString()
    account_number_receiver: string;

    @ApiProperty()
    @IsString()
    account_number_sender: string;

    @ApiProperty()
    @IsNumber()
    amount: number;
}

export class TransactionAccountCardDto {
    @ApiProperty()
    @IsString()
    account_number_sender: string;

    @ApiProperty()
    @IsString()
    card_receiver: string;

    @ApiProperty()
    @IsNumber()
    amount: number;
}

export class CardToCardDto {
    @ApiProperty()
    @IsString()
    card_sender: string;

    @ApiProperty()
    @IsString()
    card_receiver: string;

    @ApiProperty()
    @IsNumber()
    amount: number;
}

export class CardAccountCardDto {
    @ApiProperty()
    @IsString()
    card_sender: string;

    @ApiProperty()
    @IsString()
    account_number_receiver: string;

    @ApiProperty()
    @IsString()
    amount: number;
}