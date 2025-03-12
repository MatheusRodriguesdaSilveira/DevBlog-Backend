import { prismaClient } from "../../prisma";

interface UserRequest {
  user_id: string;
}

class DeleteUserService {
  async execute({ user_id }: UserRequest) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { id: user_id },
    });

    if (!userAlreadyExists) {
      throw new Error("Email não encontrado");
    }

    const user = await prismaClient.user.delete({
      where: {
        id: user_id,
      },
    });

    return user;
  }
}

export { DeleteUserService };
