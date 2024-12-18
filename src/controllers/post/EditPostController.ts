import { EditPostService } from "../../services/post/EditPostService";
import { Request, Response } from "express";

class EditPostController{
    async handle(req: Request, res: Response){

        const { title, description } = req.body;

        const { post_id } = req.params;

        const editPostService = new EditPostService();

        const updatePost = await editPostService.execute({ title, description, post_id });
        
        return res.status(200).json(updatePost);
    }
}

export { EditPostController }