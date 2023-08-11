import { StatsController } from './stats.controller';
import { StatsService } from './stats.servcie';
import { StatsRepository } from './stats.repository';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [StatsController],
  providers: [StatsService, StatsRepository, PrismaClient],
  imports: [AuthModule, UserModule],
  exports: [StatsService]

})export class StatsModule{}