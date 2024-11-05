import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';


@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTask(@Param('id') id: number) {
    return this.taskService.getTask(id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}