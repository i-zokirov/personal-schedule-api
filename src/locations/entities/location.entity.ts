import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity({ name: 'locations' })
export class Location {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => String, { description: 'Primary generated column ID' })
  id: string

  @Column({ type: 'varchar' })
  @Field((type) => String, { description: 'Location name' })
  name: string

  @Column({ type: 'varchar', unique: true })
  @Index()
  @Field((type) => String, { description: 'Location code' })
  locationCode: string

  @UpdateDateColumn()
  @Field((type) => Date, { description: 'Location updated at' })
  updatedAt: string

  @CreateDateColumn()
  @Field((type) => Date, { description: 'Location created at' })
  createdAt: string
}
