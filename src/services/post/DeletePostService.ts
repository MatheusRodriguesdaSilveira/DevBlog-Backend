import { prismaClient } from "../../prisma";

interface PostRequest {
  post_id: string;
}

class DeletePostService {
  async execute({ post_id }: PostRequest) {
    if (!post_id) {
      throw new Error("Post ID is required.");
    }

    // Verificando se o post existe no banco de dados
    const existingPost = await prismaClient.post.findUnique({
      where: { id: post_id },
    });

    if (!existingPost) {
      throw new Error("Post not found.");
    }

    // Deletando os comentários relacionados ao post
    const deletedComments = await prismaClient.comment.deleteMany({
      where: { postId: post_id },
    });
    console.log(`Deleted ${deletedComments.count} comments.`);

    // Deletando as curtidas relacionadas ao post
    const deletedLikes = await prismaClient.like.deleteMany({
      where: { postId: post_id },
    });
    console.log(`Deleted ${deletedLikes.count} likes.`);

    // Deletando o post
    const deletedPost = await prismaClient.post.delete({
      where: { id: post_id },
    });
    console.log(`Deleted post with ID: ${post_id}`);

    return deletedPost;
  }
}

export { DeletePostService };
