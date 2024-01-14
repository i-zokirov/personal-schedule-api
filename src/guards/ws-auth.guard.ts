import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Socket } from 'src/types/socket'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient<Socket>()
    const token = client.handshake.headers.authorization?.split(' ')[1]

    if (!token) {
      return false
    }

    try {
      const { sub } = this.jwtService.verify(token)
      if (!sub) throw new UnauthorizedException('Invalid token')
      const user = await this.usersService.findOne({
        where: {
          id: sub
        }
      })
      if (!user) throw new UnauthorizedException('Invalid token')
      client.user = user

      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}
