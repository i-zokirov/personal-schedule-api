import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { ConnectionsModule } from 'src/connections/connections.module'
import { LocationsModule } from 'src/locations/locations.module'
import { SocketstateModule } from 'src/socketstate/socketstate.module'
import { UsersModule } from 'src/users/users.module'
import { Event } from './entities/event.entity'
import { EventsResolver } from './events.resolver'
import { EventsService } from './events.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    LocationsModule,
    AuthModule,
    UsersModule,
    SocketstateModule,
    ConnectionsModule
  ],
  providers: [EventsResolver, EventsService],
  exports: [EventsService]
})
export class EventsModule {}
