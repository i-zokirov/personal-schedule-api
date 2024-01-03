import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const moduleOptions: TypeOrmModuleOptions = {
      type: 'postgres',
      //   port: this.configService.get<number>('DATABASE_PORT'),
      //   host: this.configService.get<string>('DATABASE_HOST'),
      //   username: this.configService.get<string>('DATABASE_USERNAME'),
      //   password: this.configService.get<string>('DATABASE_PASSWORD'),
      //   database: this.configService.get<string>('DATABASE_NAME'),
      url: this.configService.get<string>('DATABASE_URL'),
      entities: ['dist/**/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],

      synchronize: true,
      logging: true
    }

    console.log(moduleOptions)

    return moduleOptions
  }
}
