import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "./models/transaction.entity";
import { CacheModule } from '@nestjs/cache-manager';
import { PlasticCardModule } from "src/plasticcard/plastic-card.module";
import { AccountNumberModule } from "src/account-number/account-number.module";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction],'connection2'),PlasticCardModule,AccountNumberModule,CacheModule.register()],
    controllers: [TransactionController],
    providers:[TransactionService],
    exports: [TransactionService]
})

export class TransactionModule { }