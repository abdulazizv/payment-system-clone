import { Injectable } from "@nestjs/common";
import { UserTransaction } from "./models/usertransaction.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class userTransactionService {
    constructor(
        @InjectRepository(UserTransaction,'connection2')
        private readonly userTransaction: Repository<UserTransaction>
    ) {}


    async create(params:any) {
        const data = this.userTransaction.create(params);

        await this.userTransaction.save(data);

        return { message: 'success'}
    }

    async findAll() {
        const data = await this.userTransaction
            .createQueryBuilder('usertransaction')
            .leftJoinAndSelect('usertransaction.transaction','transaction')
            .getMany()

        return data;
    }

    async findByDate(params:any) {
        const result = await this.userTransaction
            .createQueryBuilder('plastic_card')
            .leftJoinAndSelect('plastic_card.user', 'user')
            .where('plastic_card.createdAt BETWEEN :dateFrom AND :dateTo', { dateFrom: params.date_from, dateTo: params.date_to })
            .getMany();

        return result;
    }
}