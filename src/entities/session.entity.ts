import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @ManyToOne(() => Group, group => group.sessions)
  group: Group;

  @ManyToOne(() => User, user => user.sessions)
  user: User;

}