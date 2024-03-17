import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { BankService } from './bank.service';
import { Banks } from './models/bank.entity';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@ApiTags('Banks')
@Controller('banks')
export class BankController {
    constructor(private readonly bankService: BankService) {}

    @ApiOperation({ summary: 'Create a new bank' })
    @ApiBody({ type: CreateBankDto })
    @ApiResponse({ status: 201, description: 'The bank has been successfully created', type: Banks })
    @Post()
    async createBank(@Body() createBankDto: CreateBankDto): Promise<Banks> {
        return this.bankService.createBank(createBankDto);
    }

    @ApiOperation({ summary: 'Get all banks' })
    @ApiResponse({ status: 200, description: 'Return all banks', type: [Banks] })
    @Get()
    async findAllBanks(): Promise<Banks[]> {
        return this.bankService.findAllBanks();
    }

    @ApiOperation({ summary: 'Get bank by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Return the bank with the specified ID', type: Banks })
    @Get(':id')
    async findBankById(@Param('id') id: number): Promise<Banks> {
        return this.bankService.findBankById(id);
    }

    @ApiOperation({ summary: 'Update bank by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdateBankDto })
    @ApiResponse({ status: 200, description: 'Return the updated bank', type: Banks })
    @Put(':id')
    async updateBank(@Param('id') id: number, @Body() updateBankDto: UpdateBankDto): Promise<Banks> {
        return this.bankService.updateBank(id, updateBankDto);
    }

    @ApiOperation({ summary: 'Delete bank by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Bank has been successfully deleted', type: Boolean })
    @Delete(':id')
    async deleteBank(@Param('id') id: number): Promise<boolean> {
        return this.bankService.deleteBank(id);
    }
}
