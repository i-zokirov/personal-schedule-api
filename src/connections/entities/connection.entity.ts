import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'connections' })
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

  @Column({ unique: true, nullable: false })
  @Index()
  client_id: string

  @CreateDateColumn()
  createdAt: String

  @UpdateDateColumn()
  updatedAt: String
}
