import { Request, Response } from 'express';
import { DeletePostService } from "../../services/post/DeletePostService";

class DeletePostController {
  async handle(req: Request, res: Response) {
    const deletePostService = new DeletePostService();

    const post_id = req.params.post_id;

    try {
      const post = await deletePostService.execute({ post_id });

      return res.json(post);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeletePostController };
