import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/guards/gql-auth.guard'
import { CreateLocationInput } from './dto/create-location.input'
import { UpdateLocationInput } from './dto/update-location.input'
import { Location } from './entities/location.entity'
import { LocationsService } from './locations.service'

@Resolver(() => Location)
@UseGuards(GqlAuthGuard)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Mutation(() => Location)
  createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput
  ) {
    return this.locationsService.create(createLocationInput)
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
  removeLocation(@Args('id', { type: () => String }) id: string) {
    return this.locationsService.remove(id)
  }
}
