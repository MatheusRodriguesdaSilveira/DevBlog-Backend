"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const DeleteUserService_1 = require("../../services/user/DeleteUserService");
class DeleteUserController {
    async handle(req, res) {
        const deleteUserService = new DeleteUserService_1.DeleteUserService();
        const user_id = req.params.user_id;
        try {
            const post = await deleteUserService.execute({ user_id });
            return res.json(post);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.DeleteUserController = DeleteUserController;
