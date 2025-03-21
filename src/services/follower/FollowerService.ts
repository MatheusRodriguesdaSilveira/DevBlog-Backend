import { prismaClient } from "../../prisma";

class FollowerService {
  async execute(followerId: string, followedId: string) {
    if (followerId === followedId) {
      throw new Error("O seguidor e o seguido não podem ser iguais.");
    }

    try {
      const existingFollow = await prismaClient.follower.findFirst({
        where: {
          followerId,
          followedId,
        },
      });

      if (existingFollow) {
        // Remover follow
        await prismaClient.follower.delete({
          where: {
            id: existingFollow.id,
          },
        });
        return {
          message: `Follow removido: ${followerId} deixou de seguir ${followedId}`,
          id: existingFollow.id,
        };
      } else {
        // Criar novo follow
        const newFollow = await prismaClient.follower.create({
          data: {
            followerId,
            followedId,
          },
        });
        return {
          message: `Follow adicionado: ${followerId} segue ${followedId}`,
          id: newFollow.id,
        };
      }
    } catch (error) {
      console.error("Erro no serviço de follow:", error);
      throw new Error("Erro ao processar o follow.");
    }
  }

  async getFollowsByUser(userId: string) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user) {
        const follows = await prismaClient.follower.findMany({
          where: {
            followerId: userId,
          },
          include: {
            followed: true,
          },
        });
        return follows;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteFollow(followerId: string, followedId: string) {
    await prismaClient.follower.delete({
      where: {
        followerId_followedId: { followerId, followedId },
      },
    });

    return { message: "Follow removido" };
  }
}

export { FollowerService };
