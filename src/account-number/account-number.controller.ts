import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { AccountNumberService } from './account-number.service';
import { CreateAccountNumberUserDto } from './dto/create-account-number-user.dto';
import { AccountNumber } from './models/account-number.entity';
import { CreateAccountNumberDto } from './dto/create-account-number.dto';

@ApiTags('Account Numbers')
@Controller('account-numbers')
export class AccountNumberController {
    constructor(private readonly accountNumberService: AccountNumberService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Account number created successfully.', type: AccountNumber })
    @ApiBadRequestResponse({ description: 'Invalid input data.' })
    async createAccountNumber(
        @Body() createAccountNumberUserDto: CreateAccountNumberUserDto,
    ): Promise<AccountNumber> {
        try {
            const accountNumber = await this.accountNumberService.createAccountNumber(createAccountNumberUserDto);
            return accountNumber;
        } catch (error) {
            console.log(error)
            throw new HttpException('Error creating account number', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('user')
    @ApiResponse({ status: 201, description: 'Account number created successfully.', type: AccountNumber })
    @ApiBadRequestResponse({ description: 'Invalid input data.' })
    async createAccountNumberUser(
        @Body() createAccountNumberDto: CreateAccountNumberDto,
    ): Promise<AccountNumber> {
        try {
            const accountNumber = await this.accountNumberService.createAccountNumberUser(createAccountNumberDto);
            return accountNumber;
        } catch (error) {
            throw new HttpException('Error creating account number', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
