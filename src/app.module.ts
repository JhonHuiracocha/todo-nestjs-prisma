import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { TasksModule } from './modules/tasks/tasks.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { TransformInterceptor } from './common/interceptors';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TasksModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
