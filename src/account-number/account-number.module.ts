import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountNumber } from "./models/account-number.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AccountNumber],'connection2')],
    controllers: [],
    providers: [],
    exports: []
})

export class AccountNumberModule {}