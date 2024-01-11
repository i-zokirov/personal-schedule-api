import { Field, ObjectType } from '@nestjs/graphql'
import * as bcrypt from 'bcryptjs'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string

  @Column({ type: 'varchar' })
  @Field(() => String)
  firstName: string

  @Column({ type: 'varchar' })
  @Field(() => String)
  lastName: string

  @Column({ unique: true, type: 'varchar' })
  @Index()
  @Field(() => String)
  email: string

  @Column({ type: 'varchar' })
  @Field(() => String)
  password: string

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt: string

  @CreateDateColumn()
  @Field(() => String)
  createdAt: string

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password)
  }
}
