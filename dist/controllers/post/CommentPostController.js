"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentPostController = void 0;
const CommentPostService_1 = require("../../services/post/CommentPostService");
class CommentPostController {
    async handle(req, res) {
        try {
            const { post_id } = req.params;
            const { comment } = req.body;
            const userId = req.user_id;
            if (!userId) {
                return res.status(401).json({ error: "Usuário não autenticado" });
            }
            const commentPostService = new CommentPostService_1.CommentPostService();
            const commentPost = await commentPostService.execute(post_id, comment, userId);
            return res.status(201).json(commentPost);
        }
        catch (error) {
            console.error("Erro ao criar comentário:", error);
            return res.status(500).json({ error: "Erro ao criar comentário" });
        }
    }
}
exports.CommentPostController = CommentPostController;
