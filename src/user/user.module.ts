import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [UserService, UserRepository, PrismaClient],
  exports: [UserService],
})
export class UserModule {}
