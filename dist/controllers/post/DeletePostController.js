"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostController = void 0;
const DeletePostService_1 = require("../../services/post/DeletePostService");
class DeletePostController {
    async handle(req, res) {
        const deletePostService = new DeletePostService_1.DeletePostService();
        const post_id = req.params.post_id;
        try {
            const post = await deletePostService.execute({ post_id });
            return res.json(post);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.DeletePostController = DeletePostController;
