import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = this.getRequest(context)
      const token = this.getToken(request)
      const { sub } = this.jwtService.verify(token)
      if (!sub) throw new UnauthorizedException('Invalid token')
      const user = await this.usersService.findOne({
        where: {
          id: sub
        }
      })
      if (!user) throw new UnauthorizedException('Invalid token')
      request.user = user
      return true
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  protected getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }

  protected getToken(request: {
    headers: Record<string, string | string[]>
  }): string {
    const authorization = request.headers['authorization']
    if (!authorization || Array.isArray(authorization)) {
      throw new UnauthorizedException('Invalid Authorization Header')
    }
    const [_, token] = authorization.split(' ')

    if (!token) throw new UnauthorizedException('Invalid token!')
    return token
  }
}
