import { Request, Response } from "express";
import { InfoUserService } from "../../services/user/InfoUserService";

class InfoUserController{
    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const infoUserService = new InfoUserService()

        const user = await infoUserService.execute(user_id)
        
        return (res as any).json(user)
    }
}

export {InfoUserController}