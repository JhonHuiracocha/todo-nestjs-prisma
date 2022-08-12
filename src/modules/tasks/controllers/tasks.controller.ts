import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { Observable } from 'rxjs';

import { TasksService } from '../services';

import { CreateTaskDto, UpdateTaskDto } from '../dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Observable<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  getTasks(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Observable<Task[]> {
    return this.tasksService.getTasks(page, +limit);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Observable<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Patch(':id')
  updatePostById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Observable<Task> {
    return this.tasksService.updatePostById(id, updateTaskDto);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Observable<Task> {
    return this.tasksService.deleteTaskById(id);
  }
}
