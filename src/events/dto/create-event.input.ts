import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator'

@InputType()
export class CreateEventInput {
  @Field(() => String, { description: 'Event title' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @ApiProperty({ description: 'Event title', minLength: 1, maxLength: 50 })
  title: string

  @Field(() => String, { description: 'Event description', nullable: true })
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Event description',
    required: false
  })
  description?: string

  @Field(() => String, { description: 'Event start date' })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Event start date' })
  startDate: Date

  @Field(() => String, { description: 'Event end date' })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Event end date' })
  endDate: Date

  @Field(() => String, { description: 'Event location ID', nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Event location ID', required: false })
  locationId?: string

  @Field(() => [String], { description: 'User emails', nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({ description: 'User Emails', required: false })
  participants?: string[]
}
