"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const HandlebarsMailTemplate_1 = __importDefault(require("./HandlebarsMailTemplate"));
class EtherealMail {
    static async sendMail({ to, from, subject, templateData, }) {
        const account = await nodemailer_1.default.createTestAccount();
        const mailTemplate = new HandlebarsMailTemplate_1.default();
        const transporter = nodemailer_1.default.createTransport({
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
        const url = nodemailer_1.default.getTestMessageUrl(message);
        return {
            messageId: message.messageId,
            url: url
        };
    }
}
exports.default = EtherealMail;
