import { Field, ObjectType } from '@nestjs/graphql'
import { Location } from 'src/locations/entities/location.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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
  startDate: Date

  @Column({ type: 'date' })
  @Field(() => String)
  endDate: Date

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @Field(() => User, { nullable: true })
  createdBy: User

  @ManyToMany(() => User, (user) => user.events, {
    onDelete: 'SET NULL',
    nullable: true
  })
  @JoinTable()
  @Field(() => [User], { nullable: true })
  participants: User[]

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
