import { CommentPostService } from "../../services/post/CommentPostService";
import { Request, Response } from "express";

class CommentPostController {
  async handle(req: Request, res: Response) {
    try {
      const { post_id } = req.params;
      const { comment } = req.body;
      const userId = req.user_id;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const commentPostService = new CommentPostService();
      const commentPost = await commentPostService.execute(post_id, comment, userId);

      return res.status(201).json(commentPost);
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      return res.status(500).json({ error: "Erro ao criar comentário" });
    }
  }
}

export { CommentPostController };