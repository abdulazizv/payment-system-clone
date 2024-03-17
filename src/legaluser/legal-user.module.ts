import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LegalUsers } from "./models/legal-user.entity";
import { LegalUsersController } from "./legal-user.controller";
import { LegalUsersService } from "./legal-user.service";

@Module({
    imports: [TypeOrmModule.forFeature([LegalUsers],'connection2')],
    controllers: [LegalUsersController],
    providers: [LegalUsersService],
    exports: [LegalUsersService]
})

export class LegalUsersModule {}