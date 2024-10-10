import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Collaboration } from '@prisma/client';
// import { CollaboratorUpdateDto } from './dto/update-collaborator.dto';

@Injectable()
export class CollaborationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    taskId: number;
    userId: number;
    role: string;
  }): Promise<Collaboration> {
    return this.prisma.collaboration.create({ data });
  }

  // async isCollaboratorTaskUpdate(
  //   userId: number,
  //   taskId: number,
  //   collaboratorUpdateDto: CollaboratorUpdateDto,
  // ) {
  //   const collaboration = await this.prisma.collaboration.findFirst({
  //     where: { userId, taskId },
  //   });
  //   if (collaboration?.role !== 'Owner') {
  //     throw new Error('unothorised userr');
  //   }
  //   return this.prisma.task.update({
  //     where: { id: taskId },
  //     data: collaboratorUpdateDto,
  //   });
  // }

  async findAllByTask(taskId: number): Promise<Collaboration[]> {
    return this.prisma.collaboration.findMany({ where: { taskId } });
  }

  async deleteCollaborator(id: number): Promise<Collaboration> {
    return this.prisma.collaboration.delete({ where: { id } });
  }

  async isCollaborator(userId: number, taskId: number) {
    const collaboration = await this.prisma.collaboration.findFirst({
      where: { userId, taskId },
    });
    return !!collaboration; 
  }
}
