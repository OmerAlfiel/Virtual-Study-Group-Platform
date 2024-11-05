import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Group, group => group.resources)
  group: Group;
}