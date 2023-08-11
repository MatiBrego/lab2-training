import { ApiProperty } from '@nestjs/swagger';

export class MailInputDto{
  @ApiProperty()
  to: string
  @ApiProperty()
  subject: string
  @ApiProperty()
  text: string

  constructor(input: MailInputDto) {
    this.to = input.to;
    this.subject = input.subject;
    this.text = input.text;
  }
}

export class MailDto{
  from: string
  to: string
  subject: string
  text: string

  constructor(input: MailDto) {
    this.from = input.from;
    this.to = input.to;
    this.subject = input.subject;
    this.text = input.text;
  }
}