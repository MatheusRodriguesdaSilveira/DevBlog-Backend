"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostService = void 0;
const prisma_1 = require("../../prisma");
class DeletePostService {
    async execute({ post_id }) {
        if (!post_id) {
            throw new Error("Post ID is required.");
        }
        const existingPost = await prisma_1.prismaClient.post.findUnique({
            where: { id: post_id },
        });
        if (!existingPost) {
            throw new Error("Post not found.");
        }
        const deletedPost = await prisma_1.prismaClient.post.delete({
            where: { id: post_id },
        });
        return deletedPost;
    }
}
exports.DeletePostService = DeletePostService;
