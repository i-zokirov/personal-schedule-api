import { UseGuards } from '@nestjs/common'
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { SocketClientUser } from 'src/decorators/ws-auth-user.decorator'
import { WsJwtGuard } from 'src/guards/ws-auth.guard'
import { Socket } from 'src/types/socket'
import { User } from 'src/users/entities/user.entity'
import { ConnectionsService } from './connections.service'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
@UseGuards(WsJwtGuard)
export class ConnectionsGateway {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @WebSocketServer()
  server: Server

  handleConnection(client: Socket, @SocketClientUser() user: User) {
    console.log(`Client connected: ${client.id}`)
    const dto = {
      client_id: client.id,
      user: user
    }
    return this.connectionsService.create(dto)
  }

  handleDisconnect(client: Socket, @SocketClientUser() user: User) {
    console.log(`Client disconnected: ${client.id} - ${user.id}`)
    return this.connectionsService.removeOneByClientId(client.id)
  }
}
