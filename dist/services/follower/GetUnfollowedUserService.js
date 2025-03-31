"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUnfollowedUsersService = void 0;
const prisma_1 = require("../../prisma");
class GetUnfollowedUsersService {
    async execute(loggedUserId) {
        // Buscar IDs dos usuários seguidos pelo logado
        const followingUsers = await prisma_1.prismaClient.follower.findMany({
            // Pessoa logada = o seguidor
            where: { followedId: loggedUserId },
            // Retorna os IDs dos usuarios seguidos = os seguidores
            select: { followerId: true },
        });
        // Extrair apenas os IDs dos usuários seguidos pelo logado
        const followingIds = followingUsers.map((user) => user.followerId);
        // Buscar usuários que o logado AINDA NÃO SEGUE (que ainda não foram seguidos pelo logado)
        const unfollowedUsers = await prisma_1.prismaClient.user.findMany({
            where: {
                id: {
                    notIn: [...followingIds, loggedUserId], // Remove apenas os seguidos e o próprio logado
                },
            },
            select: {
                id: true,
                name: true,
                profilePicture: true,
            },
        });
        return unfollowedUsers;
    }
}
exports.GetUnfollowedUsersService = GetUnfollowedUsersService;
