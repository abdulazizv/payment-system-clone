import { Injectable } from "@nestjs/common";
import { Banks } from "./models/bank.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class BankService {

    constructor(
        @InjectRepository(Banks)
        private readonly userRepository: Repository<Banks>
    ) {}
}