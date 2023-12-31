import { MailProvider } from './mail.provider';

export class MockWorkingMailProvider implements MailProvider{
    send(): Promise<boolean> {
        return Promise.resolve(true);
    }
}

export class MockNotWorkingMailProvider implements MailProvider{
    send(): Promise<boolean> {
        return Promise.resolve(false);
    }
}
