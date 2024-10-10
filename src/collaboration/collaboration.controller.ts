import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CollaborationService } from './collaboration.service';
import { JwtAuthGuard } from '@Common';

@Controller('collaborations')
export class CollaborationController {
  constructor(private readonly collaborationService: CollaborationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() collaborationDto: { taskId: number; userId: number; role: string },
  ) {
    return this.collaborationService.create(collaborationDto);
  }

  @Get(':taskId')
  async findAllByTask(@Param('taskId') taskId: string) {
    return this.collaborationService.findAllByTask(+taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCollaborator(@Param('id') id: string) {
    return this.collaborationService.deleteCollaborator(+id);
  }
}
