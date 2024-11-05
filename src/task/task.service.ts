import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

import { Group } from '../entities/group.entity';
import { User } from '../entities/user.entity';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, deadline, groupId, assignedToId } = createTaskDto;
    const group = await this.groupRepository.findOneBy({ id: groupId });
    const assignedTo = await this.userRepository.findOneBy({ id: assignedToId });
    const task = this.taskRepository.create({ title, description, deadline, group, assignedTo });
    return this.taskRepository.save(task);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (updateTaskDto.title) task.title = updateTaskDto.title;
    if (updateTaskDto.description) task.description = updateTaskDto.description;
    if (updateTaskDto.deadline) task.deadline = updateTaskDto.deadline;
    if (updateTaskDto.isCompleted !== undefined) task.isCompleted = updateTaskDto.isCompleted;
    if (updateTaskDto.assignedToId) {
      const assignedTo = await this.userRepository.findOneBy({ id: updateTaskDto.assignedToId });
      task.assignedTo = assignedTo;
    }
    return this.taskRepository.save(task);
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['group', 'assignedTo'] });
  }

  async getTask(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id }, relations: ['group', 'assignedTo'] });
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}