import { Request, Response } from "express";
import { GetUnfollowedUsersService } from "../../services/follower/GetUnfollowedUserService";

class GetUnfollowedUsersController {
  async handle(req: Request, res: Response) {
    const loggedUserId = req.user_id;

    const service = new GetUnfollowedUsersService();
    const users = await service.execute(loggedUserId);

    return res.json(users);
  }
}

export { GetUnfollowedUsersController };
