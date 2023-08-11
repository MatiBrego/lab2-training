import { PrismaClient } from "@prisma/client";
import { UserDto } from '../../../src/user/dto/user.dto';
import { UserService } from '../../../src/user/user.service';
import { UserRepository } from '../../../src/user/user.repository';
import { StatsService } from '../../../src/stats/stats.servcie';
import { StatsRepository } from '../../../src/stats/stats.repository';

describe("StatsService", ()=> {

  const db = new PrismaClient();
  let user: UserDto;
  let statsService: StatsService;


  beforeEach(async () => {
    // Clean the db
    await db.user.deleteMany()
    await db.emailsByDay.deleteMany()

    // Create user service
    const userService = new UserService(new UserRepository(db))

    // Create new user
    user = await userService.create('user1', 'user1@gmail.com', '1')

    //Create stats service
    statsService = new StatsService(new StatsRepository(db))
  })

  describe("updateUserEmailCount", () => {
    it("should add one to mail count for the day", async () => {
      await statsService.updateUserEmailCount(user.id);

      const result = await statsService.getEmailCountByUserId(user.id);

      expect(result).toBe(1);
    })

    it("should should create a new row for a new day", async () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      await db.emailsByDay.create({ data: {userId: user.id, mailCount: 20, date: yesterday}})

      await statsService.updateUserEmailCount(user.id)

      const result = await statsService.getEmailCountByUserId(user.id)

      expect(result).toBe(1)
    })
  })
})