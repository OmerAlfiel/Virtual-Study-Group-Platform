import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ForumPost } from './forum-post.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @ManyToOne(() => User, user => user.votes)
  user: User;

  @ManyToOne(() => ForumPost, forumPost => forumPost.votes)
  forumPost: ForumPost;
}