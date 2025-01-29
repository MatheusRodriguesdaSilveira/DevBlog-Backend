"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdController = void 0;
const GetUserByIdService_1 = require("../../services/user/GetUserByIdService");
class GetUserByIdController {
    async handle(req, res) {
        const { user_id } = req.params;
        const getUserByIdService = new GetUserByIdService_1.GetUserByIdService();
        const user = await getUserByIdService.execute(user_id);
        return res.json(user);
    }
}
exports.GetUserByIdController = GetUserByIdController;
