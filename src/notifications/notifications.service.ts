import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {

  constructor(private readonly mailerService: MailerService) {}

  notifyByEmail(emailList: string[], emailBody: string) {
    //This is just a simulation the email wont be send
    return;
    this.mailerService
    .sendMail({
      to: emailList.join(" "), // list of receivers
      from: 'noreply@nestjs.com', // sender address
      subject: 'New published ✔', // Subject line
      text: 'New', // plaintext body
      html: emailBody, // HTML body content
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log('error');
      console.error(error);
    });
  }

}
