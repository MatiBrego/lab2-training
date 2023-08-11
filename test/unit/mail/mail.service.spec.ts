import { UserService } from '../../../src/user/user.service';
import { UserRepository } from '../../../src/user/user.repository';
import { PrismaClient } from '@prisma/client';
import { MailService } from '../../../src/mail/mail.service';
import { MailProvider } from '../../../src/mail/provider/mail.provider';
import { MailProviderService } from '../../../src/mail/mail.provider.service';
import { MockNotWorkingMailProvider, MockWorkingMailProvider } from './util/mock.mail.provider';
import { StatsService } from '../../../src/stats/stats.servcie';
import { StatsRepository } from '../../../src/stats/stats.repository';
import { UserDto } from '../../../src/user/dto/user.dto';
import { UnauthorizedException } from '@nestjs/common';

describe("MailService", () => {

  const db = new PrismaClient();
  let mailService: MailService;

  let mailProviderService: MailProviderService;

  let providers: MailProvider[];

  let user: UserDto;

  beforeEach(async () => {
    // Clean the db
    await db.user.deleteMany()
    await db.emailsByDay.deleteMany()

    // Create user service
    const userService = new UserService(new UserRepository(db))

    // Create new user
    user = await userService.create('user1', 'user1@gmail.com', '1')

    // Inject create mock providers and inject them
    providers = [new MockNotWorkingMailProvider(), new MockNotWorkingMailProvider(), new MockWorkingMailProvider()]
    mailProviderService = new MailProviderService(providers)

    // Inject mail provider
    mailService = new MailService(userService, mailProviderService, new StatsService(new StatsRepository(db)))
  })

  describe("send", () => {
    it("should switch through all not working providers and send the msg", async () => {
      await mailService.send({to: 'user2@gmail.com', text: 'Test', subject: 'Test'}, user.id)

      expect(mailProviderService.getProvider()).toEqual(providers[2])
    })

    it("should return null if providers are not working", async () => {
      providers.forEach((provider, index) => providers[index] = new MockNotWorkingMailProvider())

      const result = await mailService.send({to: 'user2@gmail.com', text: 'Test', subject: 'Test'}, user.id)

      expect(result).toBeNull();
    })

    it("should throw an error if user has sent 1000 mails", async () => {
      await db.emailsByDay.create({ data: { mailCount: 1000, userId: user.id} })

      await expect(async () => {
        await mailService.send({to: 'user2@gmail.com', text: 'Test', subject: 'Test'}, user.id)
      }).rejects.toThrow(new UnauthorizedException("Email limit reached"))
    })
  })
})