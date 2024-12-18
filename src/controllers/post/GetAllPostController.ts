import { Request, Response } from "express";
import { GetAllPostsService } from "../../services/post/GetAllPostService";

class GetAllPostsController {
  async handle(req: Request, res: Response) {
    try {
      const posts = await new GetAllPostsService().execute();
      if (!posts) {
        return res.status(404).json({ message: "Nenhum post encontrado" });
      }
      return res.json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar posts" });
    }
  }
}

export { GetAllPostsController };