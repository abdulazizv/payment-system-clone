import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
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

    @Get()
    @ApiResponse({ status: 200, description: 'Retrieve all account numbers.', type: [AccountNumber] })
    async findAll(): Promise<AccountNumber[]> {
        return this.accountNumberService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Retrieve account number by ID.', type: AccountNumber })
    @ApiNotFoundResponse({ description: 'Account number not found.' })
    async findById(@Param('id') id: number): Promise<AccountNumber> {
        return this.accountNumberService.findById(id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Account number updated successfully.', type: AccountNumber })
    @ApiNotFoundResponse({ description: 'Account number not found.' })
    async update(
        @Param('id') id: number,
        @Body() updateAccountNumberDto: CreateAccountNumberDto,
    ): Promise<AccountNumber> {
        return this.accountNumberService.update(id, updateAccountNumberDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Account number deleted successfully.' })
    @ApiNotFoundResponse({ description: 'Account number not found.' })
    async delete(@Param('id') id: number): Promise<void> {
        return this.accountNumberService.delete(id);
    }

}
