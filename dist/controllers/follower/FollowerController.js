"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerController = void 0;
const FollowerService_1 = require("../../services/follower/FollowerService");
class FollowerController {
    async handle(req, res) {
        const { followerId, followedId } = req.body;
        try {
            const followerService = new FollowerService_1.FollowerService();
            const follow = await followerService.execute({ followerId, followedId });
            return res.json(follow);
        }
        catch (error) {
            console.error("Erro ao seguir/deixar de seguir usuário:", error);
            return res
                .status(500)
                .json({ error: "Erro ao processar a ação de seguir." });
        }
    }
    async deleteFollow(req, res) {
        const { followerId, followedId } = req.body;
        try {
            const followerService = new FollowerService_1.FollowerService();
            const follow = await followerService.deleteFollow(followerId, followedId);
            return res.json(follow);
        }
        catch (error) {
            console.error("Erro ao seguir/deixar de seguir usuário:", error);
            return res
                .status(500)
                .json({ error: "Erro ao processar a ação de seguir." });
        }
    }
}
exports.FollowerController = FollowerController;
