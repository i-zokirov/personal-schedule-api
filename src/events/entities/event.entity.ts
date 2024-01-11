import { Field, ObjectType } from '@nestjs/graphql'
import { Location } from 'src/locations/entities/location.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'events' })
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string

  @Column({ type: 'varchar' })
  @Field(() => String)
  title: string

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  description: string | null

  @Column({ type: 'date' })
  @Field(() => String)
  startDate: string

  @Column({ type: 'date' })
  @Field(() => String)
  endDate: string

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: false })
  @Field(() => User)
  createdBy: User

  @ManyToOne(() => Location, { onDelete: 'SET NULL', nullable: true })
  @Field(() => Location, { nullable: true })
  location: Location | null

  @UpdateDateColumn()
  @Field(() => Date, { description: 'Location updated at' })
  updatedAt: string

  @CreateDateColumn()
  @Field(() => Date, { description: 'Location created at' })
  createdAt: string
}
