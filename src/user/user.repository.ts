import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(username: string, email: string, password: string ): Promise<UserDto> {
    const user = await this.db.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    return new UserDto(user);
  }

  //TODO Join findBy functions into one
  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.db.user.findUnique({
      where: { email: email },
    });
    return user ? new UserDto(user) : null;
  }

  async findByUsername(username: string): Promise<UserDto | null> {
    const user = await this.db.user.findUnique({
      where: { username: username },
    });
    return user ? new UserDto(user) : null;
  }

  async findById(userId: number): Promise<UserDto | null>{
    const user = await this.db.user.findUnique({
      where: {id: userId}
    })

    return user ? new UserDto(user) : null;
  }
}
