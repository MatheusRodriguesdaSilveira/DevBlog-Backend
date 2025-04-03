import { Request, Response } from "express";
import { FollowerService } from "../../services/follower/FollowerService";

class FollowerController {
  async handle(req: Request, res: Response) {
    const { followerId, followedId } = req.body;
    try {
      const followerService = new FollowerService();
      const follow = await followerService.execute({ followerId, followedId });
      return res.json(follow);
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir usuário:", error);
      return res
        .status(500)
        .json({ error: "Erro ao processar a ação de seguir." });
    }
  }

  async deleteFollow(req: Request, res: Response) {
    const { followerId, followedId } = req.body;

    try {
      const followerService = new FollowerService();
      const follow = await followerService.deleteFollow(followerId, followedId);
      return res.json(follow);
    } catch (error) {
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

  async searchFollowedUsers(req: Request, res: Response) {
    const { search } = req.query;
    const userId = req.user_id;

    try {
      const followerService = new FollowerService();
      const followedUsers = await followerService.searchFollowedUsers(
        search as string,
        userId
      );

      return res.json(followedUsers);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar usuários seguidos" });
    }
  }

  async searchFollowersUsers(req: Request, res: Response) {
    const { search } = req.query;
    const userId = req.user_id;

    try {
      const followerService = new FollowerService();
      const followerUsers = await followerService.searchFollowersUsers(
        search as string,
        userId
      );

      return res.json(followerUsers);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar usuários seguidos" });
    }
  }
}

export { FollowerController };
