import { LikeService } from "../../services/like/LikePostService";
import { Request, Response } from "express";

class LikeController {
async handle(req: Request, res: Response) {
  const { post_id } = req.params;
  const { userId } = req.body;

  if (!post_id || !userId) {
    return res.status(400).json({ error: "Par metros inv lidos: post_id, userId" });
  }

  try {
    const likeService = new LikeService();
    const like = await likeService.execute(post_id, userId);
    return res.json(like);
  } catch (error) {
    console.error("Erro ao criar like:", error);
    return res.status(500).json({ error: "Erro ao criar like" });
  }
}

  async getLikesByPostId(req: Request, res: Response) {
    const { post_id } = req.params;
    const likeService = new LikeService();
    const likes = await likeService.getLikesByPostId(post_id);
    return res.json(likes);
  }

  async getLikesByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    const likeService = new LikeService();
    const likes = await likeService.getLikesByUserId(userId);
    return res.json(likes);
  }

  async deleteLike(req: Request, res: Response) {
    const { id } = req.params;
    const likeService = new LikeService();
    await likeService.deleteLike(parseInt(id));
    return res.status(204).json();
  }
}

export { LikeController };