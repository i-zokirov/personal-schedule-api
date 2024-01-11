import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Location } from './entities/location.entity'
import { LocationsResolver } from './locations.resolver'
import { LocationsService } from './locations.service'

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationsResolver, LocationsService],
  exports: [LocationsService]
})
export class LocationsModule {}
