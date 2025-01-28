import { LikePostService } from "../../services/like/testelike";
import { Request, Response } from "express";

class LikePostController {
  async handle(req: Request, res: Response) {
    try {
      const { post_id } = req.params;
      const { userId } = req.body

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const likePostService = new LikePostService();
      const likePost = await likePostService.execute({ post_id, userId: req.body.userId });

      return res.status(201).json(likePost);
    } catch (error) {
      console.error("Erro ao criar like:", error);
      return res.status(500).json({ error: "Erro ao criar like" });
    }
  }
}

export { LikePostController };