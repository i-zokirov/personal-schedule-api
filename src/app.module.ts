import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { CacheModule } from '@nestjs/cache-manager'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { TypeOrmConfigService } from './config/typeorm.config'
import { ConnectionsModule } from './connections/connections.module'
import { EventsModule } from './events/events.module'
import { LocationsModule } from './locations/locations.module'
import { SocketstateModule } from './socketstate/socketstate.module'
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
      autoSchemaFile: 'src/graphql/schema.gql',
      context: ({ req }) => ({ req })
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 1000
    }),
    UsersModule,
    AuthModule,
    LocationsModule,
    EventsModule,
    ConnectionsModule,
    SocketstateModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    }
  ]
})
export class AppModule {}
