import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { Event } from './entities/event.entity'

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private repository: Repository<Event>) {}

  create(createEventInput: Partial<Event>) {
    const event = this.repository.create(createEventInput)
    return this.repository.save(event)
  }

  findAll(options?: FindManyOptions<Event>) {
    return this.repository.find(options)
  }

  count(options?: FindManyOptions<Event>) {
    return this.repository.count(options)
  }

  findOne(options?: FindOneOptions<Event>) {
    return this.repository.findOne(options)
  }

  async update(id: string, updateEventInput: Partial<Event>) {
    const event = await this.repository.findOne({ where: { id } })
    if (!event) {
      return null
    }
    Object.assign(event, updateEventInput)
    return this.repository.save(event)
  }

  async updateEvent(event: Event, updateEventInput: Partial<Event>) {
    Object.assign(event, updateEventInput)
    return this.repository.save(event)
  }

  async remove(id: string) {
    const event = await this.repository.findOne({ where: { id } })
    if (!event) {
      return null
    }
    return this.repository.remove(event)
  }

  async removeEvent(event: Event) {
    return this.repository.remove(event)
  }
}
