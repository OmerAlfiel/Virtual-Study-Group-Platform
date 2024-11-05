import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from '../entities/task.entity';
import { Group } from '../entities/group.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Group, User])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}