import { Injectable } from '@nestjs/common';
import { MailProvider } from './provider/mail.provider';

@Injectable()
export class MailProviderService{

  private using: number;

  constructor(private readonly providers: MailProvider[]) {
    this.using = 0
  }

  switchProvider(): MailProvider{
    this.using++
    if(this.using === this.providers.length){this.using = 0}
    return this.providers[this.using]
  }

  getProvider(): MailProvider{
    return this.providers[this.using];
  }
}