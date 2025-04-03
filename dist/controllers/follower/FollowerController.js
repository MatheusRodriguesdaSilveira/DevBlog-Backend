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
            if (error.message === "Follow relationship does not exist.") {
                return res
                    .status(404)
                    .json({ error: "Relacionamento não encontrado." });
            }
            return res
                .status(500)
                .json({ error: "Erro ao processar a ação de seguir." });
        }
    }
    async searchFollowedUsers(req, res) {
        const { search } = req.query;
        const userId = req.user_id;
        try {
            const followerService = new FollowerService_1.FollowerService();
            const followedUsers = await followerService.searchFollowedUsers(search, userId);
            return res.json(followedUsers);
        }
        catch (error) {
            return res
                .status(500)
                .json({ error: "Erro ao buscar usuários seguidos" });
        }
    }
    async searchFollowersUsers(req, res) {
        const { search } = req.query;
        const userId = req.user_id;
        try {
            const followerService = new FollowerService_1.FollowerService();
            const followerUsers = await followerService.searchFollowersUsers(search, userId);
            return res.json(followerUsers);
        }
        catch (error) {
            return res
                .status(500)
                .json({ error: "Erro ao buscar usuários seguidos" });
        }
    }
}
exports.FollowerController = FollowerController;
