import { Module } from "@nestjs/common";
import { Banks } from "./models/bank.entity";
import { BankService } from "./bank.service";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports:[
        TypeOrmModule.forFeature([Banks])
    ],
    controllers: [],
    providers: [BankService],
    exports: [BankService]
})

export class BanksModule {}