import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length
} from 'class-validator'

@InputType()
export class UpdateLocationInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({ description: 'Location ID', required: true })
  id: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  @ApiPropertyOptional({
    description: 'Location name',
    minLength: 1,
    maxLength: 50,
    required: false
  })
  name?: string
}
