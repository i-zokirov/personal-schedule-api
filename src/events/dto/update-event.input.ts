import { Field, InputType, PartialType } from '@nestjs/graphql'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { CreateEventInput } from './create-event.input'

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => String)
  @ApiProperty({ description: 'Event ID', example: '1' })
  @IsNotEmpty()
  @IsString()
  id: string

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({
    description: 'Event title',
    example: 'My event'
  })
  @IsOptional()
  @IsString()
  title?: string

  @Field(() => String, { description: 'Event description', nullable: true })
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Event description',
    minLength: 1,
    maxLength: 500,
    required: false
  })
  description?: string

  @Field(() => String, { description: 'Event start date', nullable: true })
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Event start date', nullable: true })
  startDate: Date

  @Field(() => String, { description: 'Event end date', nullable: true })
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Event end date', nullable: true })
  endDate: Date

  @Field(() => String, { description: 'Event location ID', nullable: true })
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Event location ID', required: false })
  locationId?: string

  @Field(() => [String], { description: 'User emails', nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({ description: 'User Emails', required: false })
  participants?: string[]
}
