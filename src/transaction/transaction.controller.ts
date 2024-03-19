import { Controller, Post, Body, HttpStatus, HttpException, Param, Patch } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CardToCardDto } from './dto/transaction-account-number.dto';
import { ApproveTransactionDto } from './dto/approve-transaction.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post('card2card')
    @ApiOperation({ summary: 'Create a transaction from card to card' })
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiBadRequestResponse({ description: 'Invalid request' })
    async createTransactionCard2Card(@Body() params: CardToCardDto) {
        return await this.transactionService.createTransactionCard2Card(params);
      
    }

    @Patch('approve/:transaction_id')
    @ApiOperation({ summary: 'Approve a transaction with OTP' })
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 406, description: 'Transaction not found' })
    @ApiResponse({ status: 404, description: 'OTP is incorrect' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async approveTransactionWithCard(@Param('transaction_id') transaction_id: string,@Body() payload: ApproveTransactionDto) {
            return await this.transactionService.approveTransactionWithCard(transaction_id, payload);
    }
}
