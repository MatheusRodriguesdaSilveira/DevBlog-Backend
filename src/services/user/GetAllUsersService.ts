import { prismaClient } from "../../prisma";

class GetAllUsersService {
  async execute(loggedUserId: string) {
    const users = await prismaClient.user.findMany({
      where: {
        id: {
          not: loggedUserId
        }
      },
      select: {
        id: true,
        email: true,
        name: true,
        descriptionProfile: true,
        blogProfile: true,
        linkedinProfile: true,
        profilePicture: true
      }
    });

    return users;
  }
}

export { GetAllUsersService };