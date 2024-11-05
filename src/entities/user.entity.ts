import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, OneToOne } from 'typeorm';
import { Group } from './group.entity';
import { ForumPost } from './forum-post.entity';
import { Comment } from './comment.entity';
import { Vote } from './vote.entity';
import { Task } from './task.entity';
import { Notification } from './notification.entity';
import { NotificationSettings } from './notification-settings.entity';
import { Session } from './session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Group, group => group.users)
  @JoinTable()
  groups: Group[];

  @OneToMany(() => ForumPost, forumPost => forumPost.user)
  forumPosts: ForumPost[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[];

  @OneToMany(() => Task, task => task.assignedTo)
  tasks: Task[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  @OneToOne(() => NotificationSettings, notificationSettings => notificationSettings.user)
  notificationSettings: NotificationSettings;

  @OneToMany(() => Session, session => session.user)
  sessions: Session[];
}