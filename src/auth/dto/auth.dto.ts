import { ApiProperty } from '@nestjs/swagger';

export class SignUpInput{
    @ApiProperty()
    email: string
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string

    constructor(input: SignUpInput) {
        this.email = input.email
        this.username = input.username
        this.password = input.password
    }
}

export class SignInInput{
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string

    constructor(input: SignUpInput) {
        this.username = input.username
        this.password = input.password
    }
}