import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ForumPost } from './forum-post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.comments)
  user: User;

  @ManyToOne(() => ForumPost, forumPost => forumPost.comments)
  forumPost: ForumPost;
}