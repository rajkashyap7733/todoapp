import { Controller, Post, Body, Param } from '@nestjs/common';
import { TimerService } from './timer.service';

@Controller('timer')
export class TimerController {
  constructor(private readonly timerService: TimerService) {}


  @Post('start')
  async startTimer(
    @Body('userId') userId: number,
    @Body('taskId') taskId: number,
  ) {
    return this.timerService.startTimer(userId, taskId);
  }

  
  @Post('end/:id')
  async endTimer(@Param('id') timerId: number) {
    return this.timerService.endTimer(timerId);
  }
}
