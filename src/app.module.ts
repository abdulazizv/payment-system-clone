import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Banks } from './bank/models/bank.entity';
import { PhysicalUsers } from './physicaluser/models/physical-user.entity';
import { PlasticCard } from './plasticcard/models/plastic-card.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'criminalist',
      password: 'criminalist',
      database: 'bankdb',
      entities: [],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'connection2',
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'criminalist',
      password: 'criminalist',
      database: 'userdb',
      entities: [PhysicalUsers,PlasticCard,Banks],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
