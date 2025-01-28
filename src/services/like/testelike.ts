import { prismaClient } from "../../prisma";

interface LikeRequest {
  post_id: string;
  userId: string;
}
class LikePostService {
  async execute({ post_id, userId }: LikeRequest) {
    try {
      const newLike = await prismaClient.like.create({
        data: {
          userId: userId,
          postId: post_id,
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
}

export { LikePostService };