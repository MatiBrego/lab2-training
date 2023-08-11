import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MailDto, MailInputDto } from './dto/mail.dto';
import { UserService } from '../user/user.service';
import { MailProvider } from './provider/mail.provider';
import { MailProviderService } from './mail.provider.service';
import { StatsService } from '../stats/stats.servcie';

@Injectable()
export class MailService{

  provider: MailProvider;

  constructor(private readonly userService: UserService,
              private readonly providerService: MailProviderService,
              private readonly statsService: StatsService) {
    this.provider = providerService.getProvider();
  }

  async send(input: MailInputDto, userId): Promise<MailDto | null>{

    // Check if mail limit has been reached
    if(!(await this.canSendEmail(userId))) throw new UnauthorizedException('Email limit reached')

    // Try to send message
    const user = await this.userService.getUserById(userId);

    const msg = {from: user.email, ...input}

    const wasSent = await this.sendWithWorkingProvider(msg)

    if(wasSent){
      // Return message if sent
      await this.statsService.updateUserEmailCount(userId)

      return {from: user.email, to: input.to, subject: input.subject, text: input.text}
    }else {
      // Return null if all providers are down
      return null
    }
  }

  /*
  * Tries to send the mail with current provider. If it is down, switch providers until a working one is found, or 5 times.
  */
  private async sendWithWorkingProvider(msg: {to: string, from: string, text: string, subject: string}): Promise<boolean>{
    let count = 0

    let wasSent = await this.provider.send(msg)

    while(!wasSent && count < 5) {
      this.provider = this.providerService.switchProvider();
      wasSent = await this.provider.send(msg);
      count ++;
    }

    return wasSent;
  }

  private async canSendEmail(userId){
    const count = await this.statsService.getEmailCountByUserId(userId);

    return count < 1000
  }
}