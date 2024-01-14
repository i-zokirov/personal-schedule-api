import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { TypeOrmConfigService } from './config/typeorm.config'
import { EventsModule } from './events/events.module'
import { LocationsModule } from './locations/locations.module'
import { UsersModule } from './users/users.module'
import { ConnectionsModule } from './connections/connections.module';
import { SocketstateModule } from './socketstate/socketstate.module';

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
