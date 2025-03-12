import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const deleteUserService = new DeleteUserService();

    const user_id = req.params.user_id;

    try {
      const post = await deleteUserService.execute({ user_id });

      return res.json(post);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeleteUserController };
