// Replies.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Thread } from "./Thread"

@Entity()
export class Replies {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: true })
  content: string

  @Column({nullable: true })
  image: string

  @ManyToOne(() => User, (user) => user.replies, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: User

  @ManyToOne(() => Thread, (thread) => thread.replies, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  thread: Thread
}
