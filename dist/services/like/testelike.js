"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePostService = void 0;
const prisma_1 = require("../../prisma");
class LikePostService {
    async execute({ post_id, userId }) {
        try {
            const newLike = await prisma_1.prismaClient.like.create({
                data: {
                    userId: userId,
                    postId: post_id,
                },
                select: {
                    id: true,
                    postId: true,
                    userId: true,
                    createdAt: true,
                },
            });
            console.log("Novo like criado:", newLike);
            return newLike;
        }
        catch (error) {
            console.error("Erro no serviço de like:", error);
            throw new Error("Erro ao processar o like.");
        }
    }
}
exports.LikePostService = LikePostService;
