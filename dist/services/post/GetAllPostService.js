"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPostsService = void 0;
const prisma_1 = require("../../prisma");
class GetAllPostsService {
    async execute() {
        const users = await prisma_1.prismaClient.post.findMany({
            select: {
                user: true,
                id: true,
                title: true,
                description: true,
                imageUrl: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        return users;
    }
}
exports.GetAllPostsService = GetAllPostsService;
