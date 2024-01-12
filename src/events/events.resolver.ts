import { UnauthorizedException, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/guards/gql-auth.guard'
import { LocationsService } from 'src/locations/locations.service'
import { Between, FindManyOptions } from 'typeorm'
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
    private readonly locationsService: LocationsService
  ) {}

  @Mutation(() => Event)
  async createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
    @Context() context
  ) {
    const { locationId, ...rest } = createEventInput
    const user = context.req.user
    const eventDto: Partial<Event> = {
      ...rest,
      createdBy: user,
      participants: [user]
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
    return this.eventsService.create(eventDto)
  }

  @Query(() => FindManyEventsResponse, { name: 'events' })
  async findManyEvents(
    @Args('findManyArgsInput', {
      nullable: true,
      type: () => FindManyArgsInput
    })
    findManyArgsInput?: FindManyArgsInput
  ) {
    const options: FindManyOptions<Event> = {
      relations: ['participants', 'location', 'createdBy']
    }

    const defaultLimit =
      findManyArgsInput && findManyArgsInput.limit
        ? findManyArgsInput.limit
        : 100
    const defaultPage =
      findManyArgsInput && findManyArgsInput.page ? findManyArgsInput.page : 1

    if (findManyArgsInput) {
      const { from, to } = findManyArgsInput
      if (from && to) {
        options.where = {
          ...options.where,
          startDate: Between(new Date(from), new Date(to))
        }
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

    const { locationId, id, ...rest } = updateEventInput

    const updateInput: Partial<Event> = {
      ...rest
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
    return updated
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

    if (event.createdBy.id !== user.id) {
      throw new UnauthorizedException(
        'You are not allowed to update this event'
      )
    }

    return this.eventsService.removeEvent(event)
  }
}
