import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlasticCard } from "./models/plastic-card.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([PlasticCard])
    ],
    controllers: [],
    providers: []
})

export class PlasticCardModule {}