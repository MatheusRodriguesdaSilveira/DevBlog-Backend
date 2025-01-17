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
        comments: {
          select: {
            user: {
              select: {
                name: true,
                profilePicture: true,
              }
            },
            id: true,
            content: true,
          },
          orderBy: {
            createdAt: "desc",
          }
        },
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    return users;
  }
}

export { GetAllPostsService };