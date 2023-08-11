import {Injectable} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UserService{

    constructor(private readonly userRepository: UserRepository) {
    }

    async create(username: string, email: string, password: string): Promise<UserDto>{
        return await this.userRepository.create(username, email, password)
    }

    async getUserByEmail(email: string): Promise<UserDto | null>{
        return await this.userRepository.findByEmail(email);
    }

    async getUserByUsername(username: string): Promise<UserDto | null>{
        return await this.userRepository.findByUsername(username);
    }

    async getUserById(userId: number): Promise<UserDto | null>{
        return await this.userRepository.findById(userId);
    }

    async userIsAdmin(userId: number): Promise<boolean>{
        const user = (await this.userRepository.findById(userId));

        return user? user.isAdmin : false
    }
}