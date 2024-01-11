import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateEventInput } from './dto/create-event.input'
import { UpdateEventInput } from './dto/update-event.input'
import { Event } from './entities/event.entity'

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private repository: Repository<Event>) {}

  create(createEventInput: CreateEventInput) {
    return 'This action adds a new event'
  }

  findAll() {
    return `This action returns all events`
  }

  findOne(id: number) {
    return `This action returns a #${id} event`
  }

  update(id: number, updateEventInput: UpdateEventInput) {
    return `This action updates a #${id} event`
  }

  remove(id: number) {
    return `This action removes a #${id} event`
  }
}
