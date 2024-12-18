import { prismaClient } from "../../prisma";

interface UserRequest {
  user_id: string;
  name?: string;
  descriptionProfile?: string;
  blogProfile?: string | null;
  linkedinProfile?: string | null;
  profilePicture?: string;
}

class UpdateUserService {
  async execute({
    user_id,
    name,
    descriptionProfile,
    blogProfile,
    linkedinProfile,
    profilePicture,
  }: UserRequest) {
    if (!user_id) {
      throw new Error("User ID is required to update user.");
    }

    // Verificar se o usuário existe
    const userExists = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!userExists) {
      throw new Error("User not found.");
    }

    // Atualizar os dados do usuário
    const updatedUser = await prismaClient.user.update({
      where: { id: user_id },
      data: {
        name,
        descriptionProfile,
        blogProfile,
        linkedinProfile,
        profilePicture,
      },
      select: {
        name: true,
        descriptionProfile: true,
        blogProfile: true,
        linkedinProfile: true,
        profilePicture: true,
      },
    });

    return updatedUser;
  }
}

export { UpdateUserService };
