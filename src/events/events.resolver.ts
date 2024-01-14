import { UnauthorizedException, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { isEmail } from 'class-validator'
import { GqlAuthGuard } from 'src/guards/gql-auth.guard'
import { LocationsService } from 'src/locations/locations.service'
import { UsersService } from 'src/users/users.service'
import { Between, In } from 'typeorm'
import { CreateEventInput } from './dto/create-event.input'
import { FindManyArgsInput } from './dto/find-many-args.input'
import { FindManyEventsResponse } from './dto/find-many-response.input'
import { UpdateEventInput } from './dto/update-event.input'
import { Event } from './entities/event.entity'
import { EventsService } from './events.service'

@Resolver(() => Event)
@UseGuards(GqlAuthGuard)
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
    private readonly locationsService: LocationsService,
    private readonly usersService: UsersService
  ) {}

  @Mutation(() => Event)
  async createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
    @Context() context
  ) {
    const { locationId, participants, ...rest } = createEventInput
    const user = context.req.user
    const eventDto: Partial<Event> = {
      ...rest,
      createdBy: user,
      participants: [user]
    }

    if (participants && participants.length) {
      const participantEmails = participants.filter((p) => isEmail(p))

      if (participantEmails.length) {
        const users = await this.usersService.findAll({
          where: {
            email: In(participantEmails)
          }
        })
        if (users && users.length) {
          eventDto.participants = [...eventDto.participants, ...users]
        }
      }
    }

    if (locationId) {
      const location = await this.locationsService.findOne({
        where: { id: locationId }
      })
      if (!location) {
        throw new Error('Location not found')
      }
      eventDto.location = location
    }
    const created = await this.eventsService.create(eventDto)

    return this.eventsService.findOne({
      where: {
        id: created.id
      },
      relations: ['participants', 'location', 'createdBy']
    })
  }

  @Query(() => FindManyEventsResponse, { name: 'events' })
  async findManyEvents(
    @Context() context,
    @Args('findManyArgsInput', {
      nullable: true,
      type: () => FindManyArgsInput
    })
    findManyArgsInput?: FindManyArgsInput
  ) {
    const user = context.req.user
    const options: any = {
      where: [
        {
          createdBy: {
            id: user.id
          }
        },
        {
          participants: {
            id: user.id
          }
        }
      ],
      relations: ['participants', 'location', 'createdBy']
    }

    const defaultLimit =
      findManyArgsInput && findManyArgsInput.limit
        ? findManyArgsInput.limit
        : 100
    const defaultPage =
      findManyArgsInput && findManyArgsInput.page ? findManyArgsInput.page : 1

    if (findManyArgsInput) {
      const { from, to, locationId } = findManyArgsInput
      if (from && to) {
        options.where = options.where.map((query) => ({
          ...query,
          startDate: Between(new Date(from), new Date(to))
        }))
      }

      if (locationId) {
        options.where = options.where.map((query) => ({
          ...query,
          location: {
            id: locationId
          }
        }))
      }
    }

    const total = await this.eventsService.count(options)

    if (defaultLimit) {
      options.take = defaultLimit
    }

    if (defaultPage) {
      options.skip = defaultPage * defaultLimit - defaultLimit
    }

    const events = await this.eventsService.findAll(options)
    return {
      data: events,
      meta: {
        page: defaultPage,
        limit: defaultLimit,
        total
      }
    }
  }

  @Query(() => Event, { name: 'event', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.findOne({
      where: {
        id
      },
      relations: ['participants', 'location', 'createdBy']
    })
  }

  @Mutation(() => Event, { nullable: true })
  async updateEvent(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
    @Context() context
  ) {
    const user = context.req.user
    const event = await this.eventsService.findOne({
      where: {
        id: updateEventInput.id
      },
      relations: ['createdBy', 'participants', 'location']
    })

    if (!event) {
      return null
    }

    if (event.createdBy.id !== user.id) {
      throw new UnauthorizedException(
        'You are not allowed to update this event'
      )
    }

    const { locationId, id, participants, ...rest } = updateEventInput

    const updateInput: Partial<Event> = {
      ...rest
    }

    if (participants && participants.length) {
      const participantEmails = participants.filter((p) => isEmail(p))

      if (participantEmails.length) {
        const users = await this.usersService.findAll({
          where: {
            email: In(participantEmails)
          }
        })
        if (users && users.length) {
          updateInput.participants = users
        }
      }
    }

    if (locationId) {
      const location = await this.locationsService.findOne({
        where: { id: locationId }
      })
      if (!location) {
        throw new Error('Location not found')
      }
      updateInput.location = location
    }

    const updated = await this.eventsService.updateEvent(event, updateInput)
    return this.eventsService.findOne({
      where: {
        id: updated.id
      },
      relations: ['participants', 'location', 'createdBy']
    })
  }

  @Mutation(() => Event, { nullable: true })
  async removeEvent(
    @Args('id', { type: () => String }) id: string,
    @Context() context
  ) {
    const user = context.req.user
    const event = await this.eventsService.findOne({
      where: {
        id
      },
      relations: ['createdBy', 'participants', 'location']
    })

    if (!event) {
      return null
    }

    if (event.createdBy && event.createdBy.id !== user.id) {
      throw new UnauthorizedException(
        'You are not allowed to update this event'
      )
    }

    const deleted = await this.eventsService.removeEvent(event)
    return {
      ...deleted,
      id
    }
  }
}
