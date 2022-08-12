import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { from, map, Observable, switchMap } from 'rxjs';

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

  updatePostById(id: string, updateTaskDto: UpdateTaskDto): Observable<Task> {
    return from(
      this.prisma.task.findFirst({
        where: {
          id,
          isDelete: false,
        },
      }),
    ).pipe(
      switchMap((taskFound: Task) => {
        if (!taskFound)
          throw new NotFoundException('The task has not been found.');

        return from(
          this.prisma.task.update({
            where: {
              id,
            },
            data: updateTaskDto,
          }),
        );
      }),
    );
  }

  deleteTaskById(id: string): Observable<Task> {
    return from(
      this.prisma.task.findFirst({
        where: {
          id,
          isDelete: false,
        },
      }),
    ).pipe(
      switchMap((taskFound: Task) => {
        if (!taskFound)
          throw new NotFoundException('The task has not been found.');

        return from(
          this.prisma.task.update({
            where: {
              id,
            },
            data: {
              isDelete: true,
            },
          }),
        );
      }),
    );
  }
}
