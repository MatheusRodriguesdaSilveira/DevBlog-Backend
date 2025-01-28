"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostService = void 0;
const prisma_1 = require("../../prisma");
class CreatePostService {
    async execute({ title, description, imageUrl, userId }) {
        try {
            const userExists = await prisma_1.prismaClient.user.findUnique({
                where: { id: userId },
            });
            if (!userExists) {
                throw new Error("Usuário não encontrado");
            }
            const post = await prisma_1.prismaClient.post.create({
                data: {
                    title,
                    description,
                    imageUrl,
                    userId
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    imageUrl: true,
                },
            });
            return post;
        }
        catch (error) {
            throw new Error('Erro ao criar postagem');
        }
    }
}
exports.CreatePostService = CreatePostService;
