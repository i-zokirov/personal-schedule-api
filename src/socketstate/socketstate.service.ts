import { Injectable } from '@nestjs/common'
import { Server } from 'socket.io'

@Injectable()
export class SocketstateService {
  private server: Server = null

  setServer(server: Server) {
    this.server = server
  }

  getServer(): Server {
    return this.server
  }
}
