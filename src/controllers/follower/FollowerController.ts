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
      return res
        .status(500)
        .json({ error: "Erro ao processar a ação de seguir." });
    }
  }
}

export { FollowerController };
