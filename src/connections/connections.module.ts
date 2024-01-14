import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { UsersModule } from 'src/users/users.module'
import { ConnectionsGateway } from './connections.gateway'
import { ConnectionsService } from './connections.service'
import { Connection } from './entities/connection.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Connection]), UsersModule, AuthModule],
  providers: [ConnectionsGateway, ConnectionsService],
  exports: [ConnectionsService]
})
export class ConnectionsModule {}
