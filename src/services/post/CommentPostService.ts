import { prismaClient } from "../../prisma";

class CommentPostService {
    async execute(post_id: string, comment: string, userId: string) {
        if (!post_id || !comment) {
        throw new Error(`Parâmetros inválidos: post_id=${post_id}, comment=${comment}`);
      }

    const commentLength = comment.length;
     if (!post_id || !comment) {
      throw new Error(`Parâmetros inválidos: post_id=${post_id}, comment=${comment}`);
    }

    try {
      const newComment = await prismaClient.comment.create({
        data: {
          content: comment,
          userId: userId,
          postId: post_id,
        },
      });

      return newComment;
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      throw error;
    }
  }
}

export { CommentPostService };