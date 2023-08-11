import {Body, Controller, Post} from "@nestjs/common";
import {SignInInput, SignUpInput} from "./dto/auth.dto";
import {AuthService} from "./auth.service";
import { ApiResponse } from '@nestjs/swagger';

@Controller("/auth")
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post("/signup")
    @ApiResponse({ status: 201, description: 'User created successfully. Returns jwt token'})
    async signUp(@Body() input: SignUpInput): Promise<{token: string}>{
        return {token: await this.authService.signUp(input)};
    }

    @Post("/signin")
    @ApiResponse({ status: 201, description: 'User signed in successfully. Returns jwt token'})
    async signIn(@Body() input: SignInInput): Promise<{token: string}>{
        return {token: await this.authService.signIn(input)}
    }
}