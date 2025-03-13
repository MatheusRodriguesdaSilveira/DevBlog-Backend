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
      throw new Error("Usuário não encontrado");
    }

    // Esses sao os passos para deletar o user com suas foreign keys:
    // 1
    await prismaClient.comment.deleteMany({
      where: { post: { userId: user_id } },
    });

    // 2
    await prismaClient.like.deleteMany({
      where: { post: { userId: user_id } },
    });

    // 3
    await prismaClient.post.deleteMany({ where: { userId: user_id } });

    // 4
    await prismaClient.like.deleteMany({ where: { userId: user_id } });

    // 5
    await prismaClient.comment.deleteMany({ where: { userId: user_id } });

    // 6
    await prismaClient.follower.deleteMany({ where: { followerId: user_id } });
    await prismaClient.follower.deleteMany({ where: { followedId: user_id } });

    // 7
    await prismaClient.userToken.deleteMany({ where: { userId: user_id } });

    const user = await prismaClient.user.delete({
      where: { id: user_id },
    });

    return user;
  }
}

export { DeleteUserService };
