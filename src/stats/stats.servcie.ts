import { Injectable } from '@nestjs/common';
import { StatsRepository } from './stats.repository';
import { StatsDto } from './dto/stats.dto';

@Injectable()
export class StatsService{

  constructor(private readonly statsRepository: StatsRepository) {}

  /**
   * Adds one to the count of emails sent by the user in that day
   */
  async updateUserEmailCount(userId: number){
    const dateRange = this.getDateRange(new Date)

    const stats = await this.statsRepository.getByUserIdAndDate(userId, dateRange.dateStart, dateRange.dateEnd)

    stats? await this.statsRepository.increment(stats.id): await this.statsRepository.create(userId)
  }

  /**
   * Gets the stats from all users
   */
  async getEmailCountByUser(): Promise<StatsDto[]>{
    const dateRange = this.getDateRange(new Date);

    return await this.statsRepository.getUsersEmailCount(dateRange.dateStart, dateRange.dateEnd)
  }

  /**
   * Gets email count from user with given id
   */
  async getEmailCountByUserId(userId: number): Promise<number>{
    const dateRange = this.getDateRange(new Date)

    const stats = await this.statsRepository.getByUserIdAndDate(userId, dateRange.dateStart, dateRange.dateEnd);

    return stats? stats.mailCount: 0
  }

  /**
   * Given a date, returns an object containing two Dates: dateStart and dateEnd.
   * dateStart is the same date with time set to 0:0:0
   * dateEnd is the same date with time set to 23:59:59
   */
  private getDateRange(date: Date){
    const dateStart = new Date(date)
    const dateEnd = new Date(date)

    dateStart.setHours(0,0,0,0)
    dateEnd.setHours(23, 59, 59)

    return {dateStart: dateStart, dateEnd: dateEnd}
  }
}
