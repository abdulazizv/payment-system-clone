import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Banks } from './bank/models/bank.entity';
import { PhysicalUsers } from './physicaluser/models/physical-user.entity';
import { PlasticCard } from './plasticcard/models/plastic-card.entity';
import { BanksModule } from './bank/bank.module';
import { PhysicalUserModule } from './physicaluser/physical-user.module';
import { PlasticCardModule } from './plasticcard/plastic-card.module';
import { LegalUsersModule } from './legaluser/legal-user.module';
import { LegalUsers } from './legaluser/models/legal-user.entity';
import { AccountNumberModule } from './account-number/account-number.module';
import { AccountNumber } from './account-number/models/account-number.entity';
import { Transaction } from './transaction/models/transaction.entity';
import { TransactionModule } from './transaction/transaction.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'criminalist',
      password: 'criminalist',
      database: 'bankdb',
      entities: [Banks],
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
      entities: [PhysicalUsers,PlasticCard,LegalUsers,AccountNumber,Transaction],
      synchronize: true,
    }),
    BanksModule,
    PhysicalUserModule,
    PlasticCardModule,
    LegalUsersModule,
    AccountNumberModule,
    TransactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
