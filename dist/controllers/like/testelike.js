"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePostController = void 0;
const testelike_1 = require("../../services/like/testelike");
class LikePostController {
    async handle(req, res) {
        try {
            const { post_id } = req.params;
            const { userId } = req.body;
            if (!userId) {
                return res.status(401).json({ error: "Usuário não autenticado" });
            }
            const likePostService = new testelike_1.LikePostService();
            const likePost = await likePostService.execute({ post_id, userId: req.body.userId });
            return res.status(201).json(likePost);
        }
        catch (error) {
            console.error("Erro ao criar like:", error);
            return res.status(500).json({ error: "Erro ao criar like" });
        }
    }
}
exports.LikePostController = LikePostController;
