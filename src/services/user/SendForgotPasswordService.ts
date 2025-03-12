import EtherealMail from "../../config/mail/EtherealMail";
import { prismaClient } from "../../prisma";
import path from "path";

interface IRequest {
  email: string;
}

class SendForgotPasswordService {
  public async execute({ email }: IRequest): Promise<{ url: string }> {
    const userExists = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new Error("Email não encontrado");
    }

    const userToken = await prismaClient.userToken.create({
      data: {
        userId: userExists.id,
      },
    });

    const forgotPasswordTemplate = path.join(
      process.cwd(), "dist", "views", "forgot_password.hbs"
    );
    
    const link =
      process.env.NODE_ENV === "production"
        ? "https://dev-blog-frontend-umber.vercel.app/reset_password"
        : "http://localhost:3000";

    const { url: urlValue } = await EtherealMail.sendMail({
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

export { SendForgotPasswordService };
