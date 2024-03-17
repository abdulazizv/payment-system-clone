import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlasticCard } from "./models/plastic-card.entity";
import { PlasticCardController } from "./plastic-card.controller";
import { PlasticCardService } from "./plastic-card.service";
import { PhysicalUserModule } from "src/physicaluser/physical-user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PlasticCard],'connection2'),PhysicalUserModule
    ],
    controllers: [PlasticCardController],
    providers: [PlasticCardService]
})

export class PlasticCardModule {}