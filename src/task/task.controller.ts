import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
  Get,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthenticatedRequest, BaseController } from '@Common';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController extends BaseController {
  constructor(private taskService: TaskService) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const ctx = this.getContext(req);
    return this.taskService.createTask(createTaskDto, ctx.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, updateTaskDto);
  }
 
  @Put(':id')
  async updateTaskCollabotor(
    @Param('id') taskId: number,
    @Req() req:AuthenticatedRequest,
    @Body() data: { title?: string, status?: string, priority?: string, deadline?: Date }
  ) {
    const userId = req.user.id; 
    return await this.taskService.updateTaskCollabotor(taskId, userId, data);
  }

    
  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasksByUser(@Request() req: any) {
    const ctx = this.getContext(req);
    return this.taskService.getTasksByUser(ctx.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const ctx = this.getContext(req);
    return this.taskService.deleteTask(+id, ctx.user.id);
  }
}
