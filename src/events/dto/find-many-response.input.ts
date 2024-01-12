import { Field, ObjectType } from '@nestjs/graphql'
import { Event } from '../entities/event.entity'

@ObjectType()
export class EventsMeta {
  @Field()
  page: number

  @Field()
  limit: number

  @Field()
  total: number
}

@ObjectType()
export class FindManyEventsResponse {
  @Field(() => [Event])
  data: Event[]

  @Field(() => EventsMeta)
  meta: EventsMeta
}
