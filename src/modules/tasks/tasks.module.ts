import { Module } from '@nestjs/common';

import { TasksController } from './controllers';

import { PrismaService } from '../../common/services';
import { TasksService } from './services';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}
