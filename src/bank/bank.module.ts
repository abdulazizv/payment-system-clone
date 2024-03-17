import { Module } from "@nestjs/common";
import { Banks } from "./models/bank.entity";
import { BankService } from "./bank.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankController } from "./bank.controller";
@Module({
    imports:[
        TypeOrmModule.forFeature([Banks],'connection2')
    ],
    controllers: [BankController],
    providers: [BankService],
    exports: [BankService]
})

export class BanksModule {}