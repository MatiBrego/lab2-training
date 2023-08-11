import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StatsDto } from './dto/stats.dto';

@Injectable()
export class StatsRepository{
  constructor(private readonly db: PrismaClient){}

  async create(userId: number){
    await this.db.emailsByDay.create({
      data: {mailCount: 1, userId: userId}
    })
  }

  async increment(statsId: number){
    await this.db.emailsByDay.update({
      where: {id: statsId},
      data: {mailCount: {increment: 1}}
    })
  }

  async getByUserIdAndDate(userId: number, dateStart: Date, dateFinish: Date): Promise<StatsDto | null>{
    const stats = await this.db.emailsByDay.findFirst({
      where: {userId: userId, date: {gte: dateStart, lte: dateFinish}}
    })
    return stats? new StatsDto(stats): null
  }

  async getUsersEmailCount(dateStart: Date, dateFinish: Date): Promise<StatsDto[]>{
    return this.db.emailsByDay.findMany({
      where: { date: { gte: dateStart, lte: dateFinish } },
      select: {
        id: true,
        userId: true,
        user: {
          select: {username: true, email: true}
        },
        date: true,
        mailCount: true
      }
    });
  }
}