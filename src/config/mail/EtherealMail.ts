import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';
interface IMailContact {
  name: string;
  email: string;
}
interface ITemplateVariable {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}
interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}
export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<{ messageId: string; url: string }> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe DevBlog',
        address: from?.email || 'equipe@devblog.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });    
    const url = nodemailer.getTestMessageUrl(message)
    return {
      messageId: message.messageId,
      url: url
    }
  }
}
