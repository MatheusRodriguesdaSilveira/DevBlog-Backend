import { Request, Response } from "express";
import { GetUnfollowedUsersService } from "../../services/follower/GetUnfollowedUserService";

class GetUnfollowedUsersController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params; // Aqui você pega o ID do usuário logado (presumivelmente passado como parâmetro de URL)

    try {
      const getUnfollowedUsersService = new GetUnfollowedUsersService(); // Criação do serviço
      const unfollowedUsers = await getUnfollowedUsersService.execute(userId); // Executa o serviço com o ID do usuário

      // Retorna os usuários não seguidos em formato JSON
      return res.json(unfollowedUsers);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao buscar usuários não seguidos." });
    }
  }
}

export { GetUnfollowedUsersController };
