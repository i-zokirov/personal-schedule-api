import { Field, InputType, Int } from '@nestjs/graphql'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsDateString, IsInt, IsOptional } from 'class-validator'

@InputType()
export class FindManyArgsInput {
  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  @IsInt()
  page: number

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ description: 'Limit per page', default: 100 })
  @IsOptional()
  @IsInt()
  limit: number

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ description: 'Start date' })
  @IsOptional()
  @IsDateString()
  from?: string

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ description: 'End date' })
  @IsOptional()
  @IsDateString()
  to?: string
}
