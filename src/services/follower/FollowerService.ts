import { prismaClient } from "../../prisma";

class FollowerService {
  async execute(followerId: string, followedId: string) {
    if (followerId === followedId) {
      throw new Error("O seguidor e o seguido não podem ser iguais.");
    }

    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: followerId,
        },
      });

      const userFollowed = await prismaClient.user.findUnique({
        where: {
          id: followedId,
        },
      });

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
          message: `Follow removido: ${followedId}: ${userFollowed?.email} deixou de seguir ${followerId}: ${user?.email}`,
          id: existingFollow.id,
        };
      } else {
        // Criar novo follow
        const newFollow = await prismaClient.follower.create({
          data: {
            followerId: followerId.toString(),
            followedId: followedId.toString(),
          },
        });

        return {
          message: `Follow adicionado: ${followerId}: ${user?.email} foi seguido por ${followedId}: ${userFollowed?.email}`,
          id: newFollow.id,
        };
      }
    } catch (error) {
      console.error("Erro no serviço de follow:", error);
      throw new Error("Erro ao processar o follow.");
    }
  }

  async getFollowersByUser(userId: string) {
    try {
      if (!userId) {
        throw new Error("userId é obrigatório");
      }
      const user = await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user) {
        const followers = await prismaClient.follower.findMany({
          where: {
            followedId: userId,
          },
        });
        return followers;
      } else {
        throw new Error(`User not found with ID ${userId}`);
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
