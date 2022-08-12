import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { from, map, Observable } from 'rxjs';

import { PrismaService } from '../../../common/services';

import { CreateTaskDto, UpdateTaskDto } from '../dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  createTask(createTaskDto: CreateTaskDto): Observable<Task> {
    return from(this.prisma.task.create({ data: createTaskDto }));
  }

  getTasks(page: number = 1, limit: number = 20): Observable<Task[]> {
    limit = limit > 20 ? 20 : limit;
    const offset = (page - 1) * limit;

    return from(
      this.prisma.task.findMany({
        where: {
          isDelete: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
      }),
    );
  }

  getTaskById(id: string): Observable<Task> {
    return from(
      this.prisma.task.findFirst({
        where: {
          id,
          isDelete: false,
        },
      }),
    ).pipe(
      map((taskFound: Task) => {
        if (!taskFound)
          throw new NotFoundException('The task has not been found.');

        return taskFound;
      }),
    );
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
