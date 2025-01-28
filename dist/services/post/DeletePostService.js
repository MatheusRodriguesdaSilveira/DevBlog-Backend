"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostService = void 0;
const prisma_1 = require("../../prisma");
class DeletePostService {
    async execute({ post_id }) {
        if (!post_id) {
            throw new Error("Post ID is required.");
        }
        // Verificando se o post existe no banco de dados
        const existingPost = await prisma_1.prismaClient.post.findUnique({
            where: { id: post_id },
        });
        if (!existingPost) {
            throw new Error("Post not found.");
        }
        // Deletando os comentários relacionados ao post
        const deletedComments = await prisma_1.prismaClient.comment.deleteMany({
            where: { postId: post_id },
        });
        console.log(`Deleted ${deletedComments.count} comments.`);
        // Deletando as curtidas relacionadas ao post
        const deletedLikes = await prisma_1.prismaClient.like.deleteMany({
            where: { postId: post_id },
        });
        console.log(`Deleted ${deletedLikes.count} likes.`);
        // Deletando o post
        const deletedPost = await prisma_1.prismaClient.post.delete({
            where: { id: post_id },
        });
        console.log(`Deleted post with ID: ${post_id}`);
        return deletedPost;
    }
}
exports.DeletePostService = DeletePostService;
