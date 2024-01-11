import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { TypeOrmConfigService } from './config/typeorm.config'
import { EventsModule } from './events/events.module'
import { LocationsModule } from './locations/locations.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'src/graphql/schema.gql'
    }),
    UsersModule,
    AuthModule,
    LocationsModule,
    EventsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
