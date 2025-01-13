"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoUserController = void 0;
const InfoUserService_1 = require("../../services/user/InfoUserService");
class InfoUserController {
    async handle(req, res) {
        const user_id = req.user_id;
        const infoUserService = new InfoUserService_1.InfoUserService();
        const user = await infoUserService.execute(user_id);
        return res.json(user);
    }
}
exports.InfoUserController = InfoUserController;
