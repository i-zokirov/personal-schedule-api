import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { CreateConnectionDto } from './dto/create-connection.dto'
import { UpdateConnectionDto } from './dto/update-connection.dto'
import { Connection } from './entities/connection.entity'

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection) private repository: Repository<Connection>
  ) {}

  create(createConnectionDto: CreateConnectionDto) {
    const connection = this.repository.create(createConnectionDto)
    return this.repository.save(connection)
  }

  findAll(options?: FindManyOptions<Connection>) {
    return this.repository.find(options)
  }

  async updateOneByClientId(
    id: string,
    updateConnectionDto: UpdateConnectionDto
  ) {
    const connection = await this.repository.findOne({
      where: { client_id: id }
    })
    if (!connection) return null
    Object.assign(connection, updateConnectionDto)
    return this.repository.save(connection)
  }

  async removeOneByClientId(id: string) {
    const connection = await this.repository.findOne({
      where: { client_id: id }
    })
    if (!connection) return null
    return this.repository.remove(connection)
  }
}
