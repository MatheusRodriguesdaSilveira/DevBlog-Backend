"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserService = void 0;
const prisma_1 = require("../../prisma");
class DeleteUserService {
    async execute({ user_id }) {
        const userAlreadyExists = await prisma_1.prismaClient.user.findFirst({
            where: { id: user_id },
        });
        if (!userAlreadyExists) {
            throw new Error("Email não encontrado");
        }
        const user = await prisma_1.prismaClient.user.delete({
            where: {
                id: user_id,
            },
        });
        return user;
    }
}
exports.DeleteUserService = DeleteUserService;
