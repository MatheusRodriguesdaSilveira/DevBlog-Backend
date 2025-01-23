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
      
      console.log("Novo like criado:", newLike);
      
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
          }
        },
        createdAt: true
      }
    });
    return likes;
  }

  async getLikesByUserId(userId: string) {
    const likes = await prismaClient.like.findMany({
      where: {
        userId,
      }
    });
    return likes;
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