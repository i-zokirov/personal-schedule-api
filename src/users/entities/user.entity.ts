import * as bcrypt from 'bcryptjs'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: String })
  firstName: string

  @Column({ type: String })
  lastName: string

  @Column({ unique: true })
  email: string

  @Column({ type: String })
  password: string

  @UpdateDateColumn()
  updatedAt: string

  @CreateDateColumn()
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
