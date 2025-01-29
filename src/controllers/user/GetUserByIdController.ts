import { GetUserByIdService } from "../../services/user/GetUserByIdService";
import { Request, Response } from "express";
class GetUserByIdController {
    async handle(req: Request, res: Response) {
        const { user_id } = req.params;
        const getUserByIdService = new GetUserByIdService();
        const user = await getUserByIdService.execute(user_id);
        return res.json(user);
    }
}

export { GetUserByIdController };