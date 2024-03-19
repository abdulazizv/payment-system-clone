import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountNumber } from "./models/account-number.entity";
import { AccountNumberController } from "./account-number.controller";
import { AccountNumberService } from "./account-number.service";
import { LegalUsersModule } from "src/legaluser/legal-user.module";

@Module({
    imports: [TypeOrmModule.forFeature([AccountNumber],'connection2'),LegalUsersModule],
    controllers: [AccountNumberController],
    providers: [AccountNumberService],
    exports: [AccountNumberService]
})

export class AccountNumberModule {}