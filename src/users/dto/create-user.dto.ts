import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'First name of the user',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  firstName: string

  @ApiProperty({
    type: String,
    description: 'Last name of the user',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  lastName: string

  @ApiProperty({
    type: String,
    description: 'Email of the user',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({
    type: String,
    description: 'Password of the user',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  password: string
}
