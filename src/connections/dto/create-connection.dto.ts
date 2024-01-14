import { User } from 'src/users/entities/user.entity'

export class CreateConnectionDto {
  user: User
  client_id: string
}
