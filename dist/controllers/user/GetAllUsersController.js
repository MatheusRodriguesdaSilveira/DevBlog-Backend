"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const GetAllUsersService_1 = require("../../services/user/GetAllUsersService");
class UserController {
    async handle(req, res) {
        try {
            const users = await new GetAllUsersService_1.GetAllUsersService().execute();
            return res.json(users);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar usuários" });
        }
    }
}
exports.UserController = UserController;
