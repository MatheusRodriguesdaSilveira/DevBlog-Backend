import { prismaClient } from "../../prisma";

class LikeService {
  async execute(post_id: string, userId: string) {
    const like = await prismaClient.like.create({
      data: {
        userId: userId,
        postId: post_id,
      },
    });
    return like;
  }

  async getLikesByPostId(post_id: string) {
    const likes = await prismaClient.like.findMany({
      where: {
        postId: post_id,
      },
    });
    return likes;
  }

  async getLikesByUserId(userId: string) {
    const likes = await prismaClient.like.findMany({
      where: {
        userId,
      },
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