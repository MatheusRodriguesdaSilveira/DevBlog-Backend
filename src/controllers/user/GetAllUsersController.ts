import { Request, Response } from "express";
import { GetAllUsersService } from "../../services/user/GetAllUsersService";

class UserController {
  async handle(req: Request, res: Response) {
    try {
    const users = await new GetAllUsersService().execute();      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  }
}

export { UserController };