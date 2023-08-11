import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.servcie';
import { AdminAuthGuard } from '../auth/guard/admin.auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader } from '@nestjs/swagger';

@Controller("/stats")
@UseGuards(AuthGuard('jwt'), AdminAuthGuard)
export class StatsController{
  constructor(private statsService: StatsService) {}

  @Get("")
  @Post("/")
  @ApiHeader({
    name: 'Authorization',
    description: 'Must contain the jwt token for authorization: Bearer {token}'
  })
  async getStatsByUser(){
    return await this.statsService.getEmailCountByUser()
  }
}