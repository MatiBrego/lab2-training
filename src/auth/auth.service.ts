import {HttpException, Injectable} from "@nestjs/common";
import {SignInInput, SignUpInput} from "./dto/auth.dto";
import {UserService} from "../user/user.service";
import {compare, hash} from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import process from "process";

@Injectable()
export class AuthService{

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

    async signUp(input: SignUpInput): Promise<string>{
        input.password = await hash(input.password, 10)

        let user = await this.userService.getUserByEmail(input.email);

        if(user) throw new HttpException("Email already exists", 409);

        user = await this.userService.getUserByUsername(input.username);

        if(user) throw new HttpException("Username already exists", 409);

        user = await this.userService.create(input.username, input.email, input.password);

        return this.generateToken(user.id)
    }

    async signIn(input: SignInInput): Promise<string>{
        const user = await this.userService.getUserByUsername(input.username);

        if(!user) throw new HttpException("User with that username not found", 404);

        const passwordIsValid = await compare(input.password, user.password);

        if(!passwordIsValid) throw new HttpException("Incorrect Password", 400)

        return this.generateToken(user.id)
    }

    generateToken(id: number): string{
        return this.jwtService.sign({userId: id, }, {expiresIn: "1h", secret: this.configService.get("TOKEN_SECRET")});
    }
}
