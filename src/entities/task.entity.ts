import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  deadline: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => Group, group => group.tasks)
  group: Group;

  @ManyToOne(() => User, user => user.tasks)
  assignedTo: User;
}