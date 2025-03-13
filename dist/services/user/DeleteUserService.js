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
            throw new Error("Usuário não encontrado");
        }
        // Esses sao os passos para deletar o user com suas foreign keys:
        // 1
        await prisma_1.prismaClient.comment.deleteMany({
            where: { post: { userId: user_id } },
        });
        // 2
        await prisma_1.prismaClient.like.deleteMany({
            where: { post: { userId: user_id } },
        });
        // 3
        await prisma_1.prismaClient.post.deleteMany({ where: { userId: user_id } });
        // 4
        await prisma_1.prismaClient.like.deleteMany({ where: { userId: user_id } });
        // 5
        await prisma_1.prismaClient.comment.deleteMany({ where: { userId: user_id } });
        // 6
        await prisma_1.prismaClient.follower.deleteMany({ where: { followerId: user_id } });
        await prisma_1.prismaClient.follower.deleteMany({ where: { followedId: user_id } });
        // 7
        await prisma_1.prismaClient.userToken.deleteMany({ where: { userId: user_id } });
        const user = await prisma_1.prismaClient.user.delete({
            where: { id: user_id },
        });
        return user;
    }
}
exports.DeleteUserService = DeleteUserService;
