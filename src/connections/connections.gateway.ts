import { JwtService } from '@nestjs/jwt'
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { SocketstateService } from 'src/socketstate/socketstate.service'
import { Socket } from 'src/types/socket'
import { UsersService } from 'src/users/users.service'
import { ConnectionsService } from './connections.service'

@WebSocketGateway({
  cors: true
})
export class ConnectionsGateway {
  constructor(
    private readonly connectionsService: ConnectionsService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly socketstateService: SocketstateService
  ) {}

  @WebSocketServer()
  server: Server

  afterInit() {
    this.socketstateService.setServer(this.server)
  }

  async handleConnection(client: Socket) {
    const authToken = client.handshake.headers.authorization
    if (!authToken || !authToken.startsWith('Bearer '))
      return client.disconnect()
    const token = authToken.split(' ')[1]
    if (!token) return client.disconnect()
    const { sub } = this.jwtService.verify(token)
    if (!sub) return client.disconnect()
    const user = await this.usersService.findOne({
      where: {
        id: sub
      }
    })
    if (!user) return client.disconnect()
    console.log(`Client connected: ${client.id}`)
    const dto = {
      client_id: client.id,
      user: user
    }
    return this.connectionsService.create(dto)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`)
    return this.connectionsService.removeOneByClientId(client.id)
  }
}
