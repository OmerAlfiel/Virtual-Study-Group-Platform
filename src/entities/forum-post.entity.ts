import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Vote } from './vote.entity';


@Entity()
export class ForumPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.forumPosts)
  user: User;

  @OneToMany(() => Comment, comment => comment.forumPost)
  comments: Comment[];

  @OneToMany(() => Vote, vote => vote.forumPost)
  votes: Vote[];
}