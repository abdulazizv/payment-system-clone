import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountNumberService } from "src/account-number/account-number.service";
import { PlasticCardService } from "src/plasticcard/plastic-card.service";
import { Repository } from "typeorm";
import { Transaction } from "./models/transaction.entity";
import { CardToCardDto } from "./dto/transaction-account-number.dto";
import { TransactionEnum } from "src/common/enums/transaction.enum";
import { UserTransaction } from "src/usertransaction/models/usertransaction.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { ApproveTransactionDto } from "./dto/approve-transaction.dto";

@Injectable()

export class TransactionService {
    constructor(
        @InjectRepository(Transaction,'connection2')
        private readonly transactionRepository: Repository<Transaction>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly plasticCardService: PlasticCardService,
        // private readonly accountNumberService: AccountNumberService,
        // private readonly userTransactionService: UserTransaction
    ) {}

    async createTransactionCard2Card(params: CardToCardDto) {
        const card_sender = await this.plasticCardService.getUserByPlasticCard(params.card_sender);
        const card_receiver = await this.plasticCardService.getUserByPlasticCard(params.card_receiver);

        if(!card_sender || !card_receiver) {
            throw new HttpException(
                'Cards are not found',
                HttpStatus.NOT_FOUND
            )
        }

        const is_valid_sender = this.checkValidDate(card_sender.valid_date);
        const is_valid_receiver = this.checkValidDate(card_receiver.valid_date);

        if(!is_valid_receiver || !is_valid_sender) {
            throw new HttpException(
                'Cards are not valid',
                HttpStatus.BAD_REQUEST
            )
        }

        if(params.amount > card_sender.amount) {
            throw new HttpException(
                'Cards are not valid',
                HttpStatus.BAD_REQUEST
            )
        }

        const amount = params.amount.toString()

        const new_date = this.transactionRepository.create({
            ...params,
            amount,
            status: TransactionEnum.PENDING
        })

        const saved_transaction = await this.transactionRepository.save(new_date);

        const otp = await this.generateOTP();
        const response = {
            status: 201,
            message: "success",
            url: `http://localhost:7777/transaction/approve/${saved_transaction.id}`,
            otp
        }

        await this.cacheManager.set(String(saved_transaction.id),otp,18000);

        return response;
    }

    private async checkValidDate(valid_date: Date) {
        const current_date = new Date();

        return current_date > valid_date;
    }

    async approveTransactionWithCard(transaction_id: string,payload: ApproveTransactionDto){
        const check_otp = await this.cacheManager.get(String(transaction_id));
        console.log(check_otp)
        if(!check_otp) {
            throw new HttpException(
                'Transaction not found',
                HttpStatus.NOT_ACCEPTABLE
            )
        }

        if(Number(check_otp) !== Number(payload.otp)) {
            throw new HttpException(
                'OTP is incorrect',
                HttpStatus.NOT_FOUND
            )
        }

        const data = await this.transactionRepository.findOne({where: { id: +transaction_id }})
        
        const response_sender = await this.plasticCardService.addMoneyToAmount(data.card_receiver,data.amount);
        const response_receiver = await this.plasticCardService.takeMoneyFromAmount(data.card_sender,data.amount);
        
        const user_sender = await this.plasticCardService.findPlasticCardById(response_sender.id);
        const user_receiver = await this.plasticCardService.findPlasticCardById(response_receiver.id)
        if(!response_sender.id || !response_receiver.id) {
            throw new HttpException(
                'Error on transaction',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }

        data.status = TransactionEnum.SUCCESS;
        data.created_at = new Date();

        await this.transactionRepository.save(data);

        const response = {
            time: data.created_at,
            message: "success",
            amount: data.amount,
            sender: `${user_sender.user.first_name}  ${user_sender.user.last_name}`,
            receiver: `${user_receiver.user.first_name} ${user_receiver.user.last_name}`
        }

        return response;
    }
    
    private async generateOTP(): Promise<number> {
        const otpLength = 4;
        let otp = '';
    
        for (let i = 0; i < otpLength; i++) {
            otp += Math.floor(Math.random() * 10);
        }
    
        return +otp;
    }
}