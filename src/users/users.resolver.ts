import { Query, Resolver } from '@nestjs/graphql'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll({})
  }
}
