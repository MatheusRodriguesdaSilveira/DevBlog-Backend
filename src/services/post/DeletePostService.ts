import { prismaClient } from "../../prisma";

interface PostRequest {
  post_id: string;
}

class DeletePostService {
  async execute({ post_id }: PostRequest) {
    if (!post_id) {
      throw new Error("Post ID is required.");
    }

    const existingPost = await prismaClient.post.findUnique({
      where: { id: post_id },
    });

    if (!existingPost) {
      throw new Error("Post not found.");
    }

    const deletedPost = await prismaClient.post.delete({
      where: { id: post_id },
    });

    return deletedPost;
  }
}

export { DeletePostService };
