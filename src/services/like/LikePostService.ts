import { prismaClient } from "../../prisma";

class LikeService {
  async execute(postId: string, userId: string) {
    try {
      if (!postId || !userId) {
        throw new Error("Post ID e User ID são obrigatórios.");
      }

      const like = await prismaClient.like.findFirst({
        where: {
          userId,
          postId,
        },
      });

      if (like) {
        await prismaClient.like.delete({
          where: {
            id: like.id,
          },
          select: {
            id: true,
          },
        });

        return { message: "Like removido", id: like.id };
      }

      const newLike = await prismaClient.like.create({
        data: {
          userId,
          postId,
        },
        select: {
          id: true,
          postId: true,
          userId: true,
          createdAt: true,
        },
      });

      return {
        message: "Like adicionado",
        id: newLike.id,
        postId: newLike.postId,
        userId: newLike.userId,
        createdAt: newLike.createdAt,
      };
    } catch (error) {
      console.error("Erro no serviço de like:", error);
      throw new Error("Erro ao processar o like.");
    }
  }

  async getLikesByPostId(post_id: string) {
    const likes = await prismaClient.like.findMany({
      where: {
        postId: post_id,
      },
      select: {
        id: true,
        postId: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
    });
    return likes;
  }

  async getLikeIdsByUser(userId: string) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user) {
        const likes = await prismaClient.like.findMany({
          where: {
            userId: userId, // Filtra pelo ID do usuário
          },
          include: {
            post: true, // Inclui detalhes da postagem curtida
          },
        });
        return likes;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteLike(id: number) {
    await prismaClient.like.delete({
      where: {
        id,
      },
    });
  }
}

export { LikeService };
