import { prismaClient } from "../../prisma";

class GetAllUsersService {
  async execute() {
    const users = await prismaClient.user.findMany({
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