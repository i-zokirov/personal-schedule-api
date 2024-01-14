import { UseGuards, UseInterceptors } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/guards/gql-auth.guard'
import { GqlCacheInterceptor } from 'src/interceptors/gql-cache-interceptor'
import { CreateLocationInput } from './dto/create-location.input'
import { UpdateLocationInput } from './dto/update-location.input'
import { Location } from './entities/location.entity'
import { LocationsService } from './locations.service'

@Resolver(() => Location)
@UseGuards(GqlAuthGuard)
@UseInterceptors(GqlCacheInterceptor)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Mutation(() => Location)
  async createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput
  ) {
    const created = await this.locationsService.create(createLocationInput)
    return created
  }

  @Query(() => [Location], { name: 'locations' })
  findAll() {
    return this.locationsService.find()
  }

  @Query(() => Location, { name: 'location', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.locationsService.findOne({ where: { id } })
  }

  @Mutation(() => Location, { nullable: true })
  updateLocation(
    @Args('updateLocationInput') updateLocationInput: UpdateLocationInput
  ) {
    const { id, ...rest } = updateLocationInput
    return this.locationsService.updateOneById(id, rest)
  }

  @Mutation(() => Location, { nullable: true })
  async removeLocation(@Args('id', { type: () => String }) id: string) {
    const removed = await this.locationsService.remove(id)

    if (removed) {
      return {
        id,
        ...removed
      }
    } else {
      return null
    }
  }
}
