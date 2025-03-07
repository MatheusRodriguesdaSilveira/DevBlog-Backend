import { addHours, isAfter } from 'date-fns';
import { prismaClient } from '../../prisma';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}
class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await prismaClient.userToken.findFirst({
      where: {
        token
      }
    })

    if (!userToken) {
      throw new Error('User token does not exists');
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: userToken.userId
      }
    })

    if (!user) {
      throw new Error('User does not exists');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new Error('Token expired');
    }

    user.password = await hash(password, 8);
    
    const passwordUpdated = await prismaClient.user.update({
      where: {
        id: user.id
      },
      data: {
        password: user.password
      }
    })

    await passwordUpdated

  }
}

export { ResetPasswordService };
