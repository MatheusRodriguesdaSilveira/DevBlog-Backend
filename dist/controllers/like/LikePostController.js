"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePostController = void 0;
const LikePostService_1 = require("../../services/like/LikePostService");
class LikePostController {
    async handle(req, res) {
        try {
            const { post_id } = req.params;
            const { userId } = req.body;
            if (!post_id || !userId) {
                return res.status(400).json({ error: "Parametros invalidos: post_id, userId" });
            }
            const likeService = new LikePostService_1.LikeService();
            const like = await likeService.execute({ postId: post_id, userId });
            return res.json(like);
        }
        catch (error) {
            console.error("Erro ao criar like:", error);
            return res.status(500).json({ error: "Erro ao criar like" });
        }
    }
    async getLikesByPostId(req, res) {
        const { post_id } = req.params;
        const likeService = new LikePostService_1.LikeService();
        const likes = await likeService.getLikesByPostId(post_id);
        return res.json(likes);
    }
    async getLikesByUserId(req, res) {
        const { userId } = req.params;
        const likeService = new LikePostService_1.LikeService();
        const likes = await likeService.getLikeIdsByUser(userId);
        return res.json(likes);
    }
    async deleteLike(req, res) {
        const { id } = req.params;
        const likeService = new LikePostService_1.LikeService();
        await likeService.deleteLike(parseInt(id));
        return res.status(204).json();
    }
}
exports.LikePostController = LikePostController;
