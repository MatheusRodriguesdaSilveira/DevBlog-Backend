import { prismaClient } from "../../prisma";

interface LikeRequest {
  postId: string;
  userId: string;
}
class LikeService {
  async execute({ postId, userId }: LikeRequest) {
    try {
      if (!postId || !userId) {
        throw new Error("Post ID e User ID são obrigatórios.");
      }
  
      const like = await prismaClient.user.findUnique({
        where: {id: userId,},
      });
      
      if (like) {
        await prismaClient.like.delete({
          where: {
            userId_postId: {
              userId,
              postId,
            },
          },
          select: {
            id: true,
          },
        });
  
        return like;
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
      
      return newLike;
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

async getLikeIdsByUser(userId: string) {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId
      }
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