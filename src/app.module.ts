import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [ConfigModule.forRoot(), AuthModule, MailModule, StatsModule],
})
export class AppModule {}
