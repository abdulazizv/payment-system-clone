import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModuleOptions, SequelizeModule } from '@nestjs/sequelize';


const db1Config: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB1_HOST,
  port: parseInt(process.env.DB1_PORT),
  username: process.env.DB1_USERNAME,
  password: process.env.DB1_PASSWORD,
  database: process.env.DB1_DATABASE,
  autoLoadModels: true,
  synchronize: true,
  models: [],
};

const db2Config: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB2_HOST,
  port: parseInt(process.env.DB2_PORT),
  username: process.env.DB2_USERNAME,
  password: process.env.DB2_PASSWORD,
  database: process.env.DB2_DATABASE,
  autoLoadModels: true,
  synchronize: true,
  models: [],
};

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...db1Config,
      name: 'db1',
    }),
    SequelizeModule.forRoot({
      ...db2Config,
      name: 'db2',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}