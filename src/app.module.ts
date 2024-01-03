import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmConfigService } from './config/typeorm.config'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
