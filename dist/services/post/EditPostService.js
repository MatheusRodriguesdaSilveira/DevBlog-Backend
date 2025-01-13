"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPostService = void 0;
const prisma_1 = require("../../prisma");
class EditPostService {
    async execute({ title, description, post_id }) {
        // Verificar se o post existe
        const postExists = await prisma_1.prismaClient.post.findUnique({
            where: { id: post_id },
        });
        if (!postExists) {
            throw new Error("Post not found.");
        }
        // Verificar se o título ou descrição foram alterados
        if (postExists.title === title &&
            postExists.description === description) {
            throw new Error("Nenhum campo foi alterado.");
        }
        const updatePost = await prisma_1.prismaClient.post.update({
            where: { id: post_id },
            data: {
                title,
                description,
            },
            select: {
                id: true,
                title: true,
                description: true,
                imageUrl: true,
            }
        });
        return updatePost;
    }
}
exports.EditPostService = EditPostService;
