import { IsEmail, IsNotEmpty } from "class-validator";

export class SendEmailDto {
    @IsEmail()
    @IsNotEmpty()
    sendTo: string;

    object: string;

    html: string;
}

// sendSmtpEmail.subject = "Hello from brevo client";
//     sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email qzdqzdqzd</h1></body></html>";
//     sendSmtpEmail.sender = { "name": "paul", "email": "contact@waboostr.com" };
//     sendSmtpEmail.to = [
//       { "email": "test@gmail.com", "name": "sample-name" }
//     ];
//     sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
//     sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
//     sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
