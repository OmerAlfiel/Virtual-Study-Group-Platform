import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class NotificationSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  sessionReminders: boolean;

  @Column({ default: true })
  deadlineReminders: boolean;

  @Column({ default: true })
  generalNotifications: boolean;

  @OneToOne(() => User, user => user.notificationSettings)
  @JoinColumn()
  user: User;
}