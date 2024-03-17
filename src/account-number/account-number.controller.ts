import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountNumber } from "./models/account-number.entity";
import { Repository } from "typeorm";
import { CreateAccountNumberUserDto } from "./dto/create-account-number-user.dto";
import { LegalUsersService } from "src/legaluser/legal-user.service";
import { CreateLegalUserDto } from "src/legaluser/dto/create-legal-user.dto";
import * as randomize from 'randomatic';
@Injectable()

export class AccountNumberService {
    constructor(
        @InjectRepository(AccountNumber,'connection2')
        private readonly accountNumberRepository: Repository<AccountNumber>,
        private readonly userService: LegalUsersService
    ) {}

    async createAccountNumber(params: CreateAccountNumberUserDto) {
        const user_params: CreateLegalUserDto = {
            company_name: params.company_name,
            full_name: params.full_name,
            passport: params.passport
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
}