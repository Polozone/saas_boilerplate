import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { SendSmtpEmail, TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';
import { ConfigService } from '@nestjs/config';
import { EMAIL_PROVIDER } from './constants';

@Injectable()
export class EmailService {

  private readonly apiInstance: TransactionalEmailsApi;

  constructor(private configService: ConfigService) {
    this.apiInstance = new TransactionalEmailsApi();
    this.apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, this.configService.get<string>('BREVO_API_KEY'));
  }

  async sendEmail(sendEmail: SendEmailDto) {
    try {
      const sendSmtpEmail = new SendSmtpEmail();
      
      sendSmtpEmail.subject = sendEmail.object;
      sendSmtpEmail.htmlContent = sendEmail.html;
      sendSmtpEmail.sender = { "name": "Saas-boilerplate", "email": EMAIL_PROVIDER };
      sendSmtpEmail.to = [
        { "email": sendEmail.sendTo, "name": "sample-name" }
      ];

      this.apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      }, function (error) {
        throw new error("Error sending email", error);
      });
    } catch (e){
      throw e;
    }
  }

}
