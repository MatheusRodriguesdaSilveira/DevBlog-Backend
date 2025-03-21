import { prismaClient } from "../../prisma";

class GetUserByIdService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        name: true,
        id: true,
        descriptionProfile: true,
        blogProfile: true,
        linkedinProfile: true,
        profilePicture: true,
        followers: true,
        following: true,
        posts: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            comments: {
              select: {
                content: true,
                user: {
                  select: {
                    name: true,
                    profilePicture: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return user;
  }
}

export { GetUserByIdService };
