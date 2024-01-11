import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => String, { description: 'Primary generated column ID' })
  id: string

  @Column()
  @Field((type) => String, { description: 'Location name' })
  name: string
}
