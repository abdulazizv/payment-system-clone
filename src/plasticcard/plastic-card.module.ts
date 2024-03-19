import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlasticCard } from "./models/plastic-card.entity";
import { PlasticCardController } from "./plastic-card.controller";
import { PlasticCardService } from "./plastic-card.service";
import { PhysicalUserModule } from "src/physicaluser/physical-user.module";
import { BanksModule } from "src/bank/bank.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PlasticCard],'connection2'),PhysicalUserModule,BanksModule
    ],
    controllers: [PlasticCardController],
    providers: [PlasticCardService],
    exports: [PlasticCardService]
})

export class PlasticCardModule {}