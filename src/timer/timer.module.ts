import { Module } from '@nestjs/common';
import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from 'src/prisma';

@Module({
  imports:[PrismaModule],
  providers: [TimerService, PrismaService],
  controllers: [TimerController],
})
export class TimerModule {}
