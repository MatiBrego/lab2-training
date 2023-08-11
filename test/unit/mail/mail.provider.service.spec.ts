import { MailProviderService } from '../../../src/mail/mail.provider.service';
import { MailProvider } from '../../../src/mail/provider/mail.provider';
import { MockWorkingMailProvider } from './util/mock.mail.provider';

describe("MailProviderService", () => {

  let mailProviderService: MailProviderService;
  let mockMailProviders: MailProvider[];

  beforeEach(()=>{

    mockMailProviders = [new MockWorkingMailProvider(), new MockWorkingMailProvider(), new MockWorkingMailProvider()]

    mailProviderService = new MailProviderService(mockMailProviders);
  })

  describe("switchProvider", () => {
    it("should switch from first provider to second", ()=>{
      mailProviderService.switchProvider();

      expect(mailProviderService.getProvider()).toBe(mockMailProviders[1])
    })

    it("should switch to first provider after switching through all providers", () => {
      mockMailProviders.forEach(() => {mailProviderService.switchProvider()})

      expect(mailProviderService.getProvider()).toBe(mockMailProviders[0])
    })
  })
})