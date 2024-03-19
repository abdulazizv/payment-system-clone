import { Injectable } from "@nestjs/common";
import { Banks } from "./models/bank.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBankDto } from "./dto/create-bank.dto";
import { UpdateBankDto } from "./dto/update-bank.dto";

@Injectable()
export class BankService {

    constructor(
        @InjectRepository(Banks)
        private readonly bankRepository: Repository<Banks>
    ) {}

    async createBank(bankData: CreateBankDto): Promise<Banks> {
        const newBank = this.bankRepository.create(bankData);
        return this.bankRepository.save(newBank);
    }

    async findAllBanks(): Promise<Banks[]> {
        return this.bankRepository.find();
    }

    async findBankById(id: number): Promise<Banks> {
        return this.bankRepository.findOne({where: { id }});
    }

    async updateBank(id: number, bankData: UpdateBankDto): Promise<Banks> {
        await this.bankRepository.update(id, bankData);
        return this.findBankById(id);
    }

    async deleteBank(id: number): Promise<boolean> {
        const deleteResult = await this.bankRepository.delete(id);
        return deleteResult.affected > 0;
    }

}