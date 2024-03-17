import { Module } from "@nestjs/common";
import { PhysicalUsers } from "./models/physical-user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhysicalUserController } from "./physical-user.controller";
import { PhysicalUserService } from "./physical-user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([PhysicalUsers],'connection2')
    ],
    controllers: [PhysicalUserController],
    providers:[PhysicalUserService],
    exports: [PhysicalUserService]
})

export class PhysicalUserModule {}