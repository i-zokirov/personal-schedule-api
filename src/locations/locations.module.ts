import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { UsersModule } from 'src/users/users.module'
import { Location } from './entities/location.entity'
import { LocationsResolver } from './locations.resolver'
import { LocationsService } from './locations.service'

@Module({
  imports: [TypeOrmModule.forFeature([Location]), AuthModule, UsersModule],
  providers: [LocationsResolver, LocationsService],
  exports: [LocationsService]
})
export class LocationsModule {}
