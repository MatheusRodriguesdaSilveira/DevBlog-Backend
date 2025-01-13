"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
const prisma_1 = require("../../prisma");
class UpdateUserService {
    async execute({ user_id, name, descriptionProfile, blogProfile, linkedinProfile, profilePicture, }) {
        if (!user_id) {
            throw new Error("User ID is required to update user.");
        }
        // Verificar se o usuário existe
        const userExists = await prisma_1.prismaClient.user.findUnique({
            where: { id: user_id },
        });
        if (!userExists) {
            throw new Error("User not found.");
        }
        // Atualizar os dados do usuário
        const updatedUser = await prisma_1.prismaClient.user.update({
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
exports.UpdateUserService = UpdateUserService;
