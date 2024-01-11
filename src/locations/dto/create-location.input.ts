import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

@InputType()
export class CreateLocationInput {
  @Field(() => String, { description: 'Location name' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @ApiProperty({ description: 'Location name', minLength: 1, maxLength: 50 })
  name: string
}
