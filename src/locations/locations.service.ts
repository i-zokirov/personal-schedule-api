import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import nanoid from 'src/utils/nanoid'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { CreateLocationInput } from './dto/create-location.input'
import { UpdateLocationInput } from './dto/update-location.input'
import { Location } from './entities/location.entity'

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private repository: Repository<Location>
  ) {}

  create(createLocationInput: CreateLocationInput) {
    const location = this.repository.create({
      ...createLocationInput,
      locationCode: nanoid()
    })
    return this.repository.save(location)
  }

  find(options?: FindManyOptions<Location>) {
    return this.repository.find(options)
  }

  findOne(options?: FindOneOptions<Location>) {
    return this.repository.findOne(options)
  }

  async updateOneById(
    id: string,
    updateLocationInput: Omit<UpdateLocationInput, 'id'>
  ) {
    const location = await this.repository.findOne({ where: { id } })
    if (!location) return null
    Object.assign(location, updateLocationInput)
    return this.repository.save(location)
  }

  async remove(id: string) {
    const location = await this.repository.findOne({ where: { id } })
    if (!location) return null
    return this.repository.remove(location)
  }
}
