"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerService = void 0;
const prisma_1 = require("../../prisma");
class FollowerService {
    async execute({ followerId, followedId }) {
        if (!followerId || !followedId) {
            throw new Error("O seguidor e o seguido são obrigatórios.");
        }
        if (followerId === followedId) {
            throw new Error("O seguidor e o seguido não podem ser iguais.");
        }
        try {
            const user = await prisma_1.prismaClient.user.findUnique({
                where: {
                    id: followerId,
                },
            });
            const userFollowed = await prisma_1.prismaClient.user.findUnique({
                where: {
                    id: followedId,
                },
            });
            const existingFollow = await prisma_1.prismaClient.follower.findFirst({
                where: {
                    followerId,
                    followedId,
                },
            });
            if (existingFollow) {
                // Remover follow
                await prisma_1.prismaClient.follower.delete({
                    where: {
                        id: existingFollow.id,
                    },
                });
                return {
                    message: `Follow removido: ${followedId}: ${userFollowed?.email} deixou de seguir ${followerId}: ${user?.email}`,
                    id: existingFollow.id,
                };
            }
            else {
                // Criar novo follow
                const newFollow = await prisma_1.prismaClient.follower.create({
                    data: {
                        followerId: followerId,
                        followedId: followedId,
                    },
                });
                return {
                    message: `Follow adicionado: ${followerId}: ${user?.email} foi seguido por ${followedId}: ${userFollowed?.email}`,
                    id: newFollow.id,
                };
            }
        }
        catch (error) {
            console.error("Erro no serviço de follow:", error);
            throw new Error("Erro ao processar o follow.");
        }
    }
    async getFollowersByUser(userId) {
        try {
            if (!userId) {
                throw new Error("userId é obrigatório");
            }
            const user = await prisma_1.prismaClient.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (user) {
                const followers = await prisma_1.prismaClient.follower.findMany({
                    where: {
                        followedId: userId,
                    },
                });
                return followers;
            }
            else {
                throw new Error(`User not found with ID ${userId}`);
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deleteFollow(followerId, followedId) {
        const existingFollow = await prisma_1.prismaClient.follower.findFirst({
            where: { followerId, followedId },
        });
        if (!existingFollow) {
            throw new Error("Follow relationship does not exist.");
        }
        await prisma_1.prismaClient.follower.delete({
            where: { id: existingFollow.id },
        });
        return { message: "Unfollow successful" };
    }
    async searchFollowedUsers(search, userId) {
        const userLogged = await prisma_1.prismaClient.follower.findMany({
            where: { followedId: userId },
        });
        const followedUsers = await prisma_1.prismaClient.user.findMany({
            where: {
                id: {
                    in: userLogged.map((user) => user.followerId),
                },
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            select: {
                id: true,
                name: true,
                profilePicture: true,
            },
        });
        return followedUsers;
    }
    async searchFollowersUsers(search, userId) {
        const userLogged = await prisma_1.prismaClient.follower.findMany({
            where: { followerId: userId },
        });
        const followersUsers = await prisma_1.prismaClient.user.findMany({
            where: {
                id: {
                    in: userLogged.map((user) => user.followedId),
                },
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            select: {
                id: true,
                name: true,
                profilePicture: true,
            },
        });
        return followersUsers;
    }
}
exports.FollowerService = FollowerService;
