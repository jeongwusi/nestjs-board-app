import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './boards/board.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import * as config from 'config';

const dbConfig = config.get('db');
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: process.env.RDS_HOSTNAME || dbConfig.host,
      port: process.env.RDS_PORT || dbConfig.port,
      username: process.env.RDS_USERNAME || dbConfig.username,
      password: process.env.RDS_PASSWORD || dbConfig.password,
      database: process.env.RDS_DATABASE || dbConfig.database,
      entities: [Board, User],
      synchronize: dbConfig.synchronize,
    }),
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}
