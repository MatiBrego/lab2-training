import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class AdminAuthGuard implements CanActivate{
  constructor(private readonly userService: UserService) {
  }
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const userId = request.user

    return this.userService.userIsAdmin(userId);
  }

}