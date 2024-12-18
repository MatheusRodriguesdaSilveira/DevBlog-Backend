import { prismaClient } from "../../prisma";

class GetAllPostsService {
  async execute() {
    const users = await prismaClient.post.findMany({
      select: {
        user: true,
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return users;
  }
}

export { GetAllPostsService };