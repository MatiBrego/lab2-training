export class UserDto{
    id: number
    email: string
    username: string
    password: string
    isAdmin: boolean

    constructor(input: UserDto) {
        this.id = input.id
        this.email = input.email
        this.username = input.username
        this.password = input.password
        this.isAdmin = input.isAdmin
    }
}