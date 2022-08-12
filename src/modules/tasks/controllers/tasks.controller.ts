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
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
