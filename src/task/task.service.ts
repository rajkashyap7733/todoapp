
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto'
import { CollaborationService } from 'src/collaboration/collaboration.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService,
              private collaborationsService:CollaborationService
  ) {}

  async createTask(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
    });
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const {userId} = updateTaskDto
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException('task are not found');
    }
    if (task.userId !== userId) {
      // console.log(userId);
      // console.log(id);
      
      
      throw new ForbiddenException('unautorize user');
    }
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async updateTaskCollabotor(taskId: number, userId: number, data: { title?: string, status?: string, priority?: string, deadline?: Date }) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new ForbiddenException('task are not found');
    }

    const isCollaborator = await this.collaborationsService.isCollaborator(userId, taskId);
    if (task.userId !== userId && ! isCollaborator) {
      throw new ForbiddenException('not permission to edit this task');
    }

    return await this.prisma.task.update({
      where: { id: taskId },
      data: { ...data },
    });
  }




  async deleteTask(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (task?.userId !== userId)
      throw new Error('unauthorize  user');
    return this.prisma.task.delete({ where: { id } });
  }

  async getTasksByUser(userId: number) {
    return this.prisma.task.findMany({ where: { userId } });
  }
}
