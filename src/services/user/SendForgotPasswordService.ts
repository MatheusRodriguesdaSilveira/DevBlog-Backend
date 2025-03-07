import EtherealMail from "../../config/mail/EtherealMail";
import { prismaClient } from "../../prisma";
import path from 'path';

interface IRequest {
  email: string;
}

class SendForgotPasswordService {
  public async execute({ email }: IRequest): Promise<{ url: string}> {
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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '../..',
      'views',
      'forgot_password.hbs'
    );

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
          link: `http://localhost:3000/reset_password`,
        },
      },
    });

    return {
      url: urlValue
    }
  }
}

export { SendForgotPasswordService };
