"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendForgotPasswordService = void 0;
const EtherealMail_1 = __importDefault(require("../../config/mail/EtherealMail"));
const prisma_1 = require("../../prisma");
const path_1 = __importDefault(require("path"));
class SendForgotPasswordService {
    async execute({ email }) {
        const userExists = await prisma_1.prismaClient.user.findUnique({
            where: { email },
        });
        if (!userExists) {
            throw new Error("Email não encontrado");
        }
        const userToken = await prisma_1.prismaClient.userToken.create({
            data: {
                userId: userExists.id,
            },
        });
        const forgotPasswordTemplate = path_1.default.join(process.cwd(), "dist", "views", "forgot_password.hbs");
        const link = process.env.NODE_ENV === "production"
            ? "https://dev-blog-frontend-umber.vercel.app/reset_password"
            : "http://localhost:3000";
        const { url: urlValue } = await EtherealMail_1.default.sendMail({
            to: {
                name: userExists.name,
                email: userExists.email,
            },
            subject: '[DevBlog] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: userExists.name,
                    link: `https://dev-blog-frontend-umber.vercel.app/reset_password?token=${userToken.token}`,
                },
            },
        });
        return {
            url: urlValue,
        };
    }
}
exports.SendForgotPasswordService = SendForgotPasswordService;
