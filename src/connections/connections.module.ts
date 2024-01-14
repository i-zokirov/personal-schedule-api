import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { WsJwtGuard } from 'src/guards/ws-auth.guard'
import { SocketstateModule } from 'src/socketstate/socketstate.module'
import { UsersModule } from 'src/users/users.module'
import { ConnectionsGateway } from './connections.gateway'
import { ConnectionsService } from './connections.service'
import { Connection } from './entities/connection.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Connection]),
    UsersModule,
    AuthModule,
    forwardRef(() => SocketstateModule)
  ],
  providers: [ConnectionsGateway, ConnectionsService, WsJwtGuard],
  exports: [ConnectionsService]
})
export class ConnectionsModule {}
