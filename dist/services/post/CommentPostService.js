"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentPostService = void 0;
const prisma_1 = require("../../prisma");
class CommentPostService {
    async execute(post_id, comment, userId) {
        if (!post_id || !comment) {
            throw new Error(`Parâmetros inválidos: post_id=${post_id}, comment=${comment}`);
        }
        const commentLength = comment.length;
        if (!post_id || !comment) {
            throw new Error(`Parâmetros inválidos: post_id=${post_id}, comment=${comment}`);
        }
        try {
            const newComment = await prisma_1.prismaClient.comment.create({
                data: {
                    content: comment,
                    userId: userId,
                    postId: post_id,
                },
            });
            return newComment;
        }
        catch (error) {
            console.error("Erro ao criar comentário:", error);
            throw error;
        }
    }
}
exports.CommentPostService = CommentPostService;
