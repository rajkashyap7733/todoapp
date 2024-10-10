// src/task/task.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { CollaborationModule } from 'src/collaboration/collaboration.module';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigType } from '@nestjs/config';
// import { jwtConfigFactory } from '@Config';

@Module({
  imports: [
    PrismaModule,
    CollaborationModule,
    // JwtModule.registerAsync({
    //   useFactory: (config: ConfigType<typeof jwtConfigFactory>) => ({
    //     secret: config.secret,
    //     signOptions: config.signOptions,
    //   }),
    //   inject: [jwtConfigFactory.KEY],
    // }),
  ],
  providers: [TaskService, JwtStrategy],
  controllers: [TaskController],
})
export class TaskModule {}
