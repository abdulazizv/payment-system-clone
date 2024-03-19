import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountNumber } from "./models/account-number.entity";
import { Repository } from "typeorm";
import { CreateAccountNumberUserDto } from "./dto/create-account-number-user.dto";
import { LegalUsersService } from "src/legaluser/legal-user.service";
import { CreateLegalUserDto } from "src/legaluser/dto/create-legal-user.dto";
import * as randomize from 'randomatic';
import { CreateAccountNumberDto } from "./dto/create-account-number.dto";
import { BankService } from "src/bank/bank.service";

@Injectable()

export class AccountNumberService {
    constructor(
        @InjectRepository(AccountNumber,'connection2')
        private readonly accountNumberRepository: Repository<AccountNumber>,
        private readonly userService: LegalUsersService,
        private readonly bankService: BankService
    ) {}

    async createAccountNumber(params: CreateAccountNumberUserDto) {
        const user_params: CreateLegalUserDto = {
            company_name: params.company_name,
            full_name: params.full_name,
            passport: params.passport,
            phone: params.phone,
            email: params.email
        }

        const user = await this.userService.createLegalUser(user_params);
    
        if(!user?.id) {
            throw new HttpException(
                'Error on create user',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }

        const account_number = randomize('0',20);

        const new_data = this.accountNumberRepository.create({
            ...params,
            user_id: user.id,
            account_number
        })

        const data = await this.accountNumberRepository.save(new_data);

        return data;
    }

    async createAccountNumberUser(params: CreateAccountNumberDto) {
        const account_number = randomize('0',20);
        const new_date = this.accountNumberRepository.create({
            ...params,
            account_number
        })

        const data = await this.accountNumberRepository.save(new_date)

        return data;
    }

    async findAll(): Promise<AccountNumber[]> {
        return this.accountNumberRepository.find();
    }

    async findById(id: number): Promise<AccountNumber> {
        const accountNumber = await this.accountNumberRepository.findOne({where: { id }});
        if (!accountNumber) {
            throw new HttpException('Account number not found', HttpStatus.NOT_FOUND);
        }
        return accountNumber;
    }

    async update(id: number, updateAccountNumberDto: CreateAccountNumberDto): Promise<AccountNumber> {
        const existingAccountNumber = await this.accountNumberRepository.findOne({where: { id }});
        if (!existingAccountNumber) {
            throw new HttpException('Account number not found', HttpStatus.NOT_FOUND);
        }

        const updatedAccountNumber = await this.accountNumberRepository.save({
            ...existingAccountNumber,
            ...updateAccountNumberDto,
        });
        return updatedAccountNumber;
    }

    async delete(id: number): Promise<void> {
        const accountNumber = await this.accountNumberRepository.findOne({where : { id }});
        if (!accountNumber) {
            throw new HttpException('Account number not found', HttpStatus.NOT_FOUND);
        }
        await this.accountNumberRepository.delete(id);
    }


    private async getUserByAccountNumber(account_number: string) {
        const data:any = await this.accountNumberRepository
                    .createQueryBuilder('account_number')
                    .leftJoinAndSelect('account_number.user','user')
                    .where('account_number.account_number = :account_number', { account_number })
                    .getOne()        
   
        data.bank = await this.bankService.findBankById(data.bank_id);

        return data;
    }           

}