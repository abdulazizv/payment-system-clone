import { Module } from "@nestjs/common";
import { PhysicalUsers } from "./models/physical-user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([PhysicalUsers])
    ],
    controllers: [],
    providers:[]
})

export class PhysicalUserModule {}