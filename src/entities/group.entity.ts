import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Resource } from './resource.entity';
import { Task } from './task.entity';
import { Session } from './session.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.groups)
  users: User[];

  @OneToMany(() => Resource, resource => resource.group)
  resources: Resource[];

  @OneToMany(() => Task, task => task.group)
  tasks: Task[];

  @OneToMany(() => Session, session => session.group)
  sessions: Session[];
}