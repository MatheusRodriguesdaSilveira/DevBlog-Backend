"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const prisma_1 = require("../../prisma");
class LikeService {
    async execute(postId, userId) {
        try {
            if (!postId || !userId) {
                throw new Error("Post ID e User ID são obrigatórios.");
            }
            const like = await prisma_1.prismaClient.like.findFirst({
                where: {
                    userId,
                    postId,
                },
            });
            if (like) {
                await prisma_1.prismaClient.like.delete({
                    where: {
                        id: like.id,
                    },
                    select: {
                        id: true,
                    },
                });
                return { message: "Like removido", id: like.id };
            }
            const newLike = await prisma_1.prismaClient.like.create({
                data: {
                    userId,
                    postId,
                },
                select: {
                    id: true,
                    postId: true,
                    userId: true,
                    createdAt: true,
                },
            });
            return {
                message: "Like adicionado",
                id: newLike.id,
                postId: newLike.postId,
                userId: newLike.userId,
                createdAt: newLike.createdAt,
            };
        }
        catch (error) {
            console.error("Erro no serviço de like:", error);
            throw new Error("Erro ao processar o like.");
        }
    }
    async getLikesByPostId(post_id) {
        const likes = await prisma_1.prismaClient.like.findMany({
            where: {
                postId: post_id,
            },
            select: {
                id: true,
                postId: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                createdAt: true,
            },
        });
        return likes;
    }
    async getLikeIdsByUser(userId) {
        try {
            const user = await prisma_1.prismaClient.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (user) {
                const likes = await prisma_1.prismaClient.like.findMany({
                    where: {
                        userId: userId, // Filtra pelo ID do usuário
                    },
                    include: {
                        post: true, // Inclui detalhes da postagem curtida
                    },
                });
                return likes;
            }
            else {
                throw new Error("User not found");
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deleteLike(id) {
        await prisma_1.prismaClient.like.delete({
            where: {
                id,
            },
        });
    }
}
exports.LikeService = LikeService;
