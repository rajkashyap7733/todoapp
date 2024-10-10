import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { Timer } from '@prisma/client';

@Injectable()
export class TimerService {
    constructor(private prisma: PrismaService) { }


    async startTimer(userId: number, taskId: number) {
        return this.prisma.timer.create({
            data: {
                startTime: new Date(),
                userId,
                taskId,
            },
        });
    }
    async endTimer(timerId: number) {
        return this.prisma.timer.update({
            where: { id: timerId },
            data: {
                endTime: new Date(),
            },
        });
    }


    async getTimersByUser(userId: number) {
        return this.prisma.timer.findMany({
            where: { userId },
            include: {
                task: true, 
            },
        });
    }
}