import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  message: string;

  @Column()
  isRead: boolean;

  @ManyToOne(() => User, user => user.notifications)
  user: User;
}