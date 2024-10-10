import { Module } from '@nestjs/common';
import { CollaborationService } from './collaboration.service';
import { CollaborationController } from './collaboration.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from 'src/prisma';

@Module({
  imports: [PrismaModule],
  providers: [CollaborationService, PrismaService],
  controllers: [CollaborationController],
  exports: [CollaborationService],
})
export class CollaborationModule {}
