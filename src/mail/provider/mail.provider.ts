import { MailDto } from '../dto/mail.dto';

export interface MailProvider {
  send(input: MailDto): Promise<boolean>
}
