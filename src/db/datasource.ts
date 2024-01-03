import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

config({ path: `.env` })

const configService = new ConfigService()

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  // database: configService.get<string>('DATABASE_NAME'),
  entities: ['dist/**/**/*.entity.js'],
  // migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
  logging: true,
  url: configService.get<string>('DATABASE_URL')
}

console.log(dataSourceOptions)

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
