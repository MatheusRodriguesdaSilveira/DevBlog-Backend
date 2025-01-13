"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPostController = void 0;
const EditPostService_1 = require("../../services/post/EditPostService");
class EditPostController {
    async handle(req, res) {
        const { title, description } = req.body;
        const { post_id } = req.params;
        const editPostService = new EditPostService_1.EditPostService();
        const updatePost = await editPostService.execute({ title, description, post_id });
        return res.status(200).json(updatePost);
    }
}
exports.EditPostController = EditPostController;
