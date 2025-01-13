"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../../services/user/AuthUserService");
class AuthUserController {
    async handle(req, res) {
        const { email, password } = req.body;
        const authUserService = new AuthUserService_1.AuthUserService();
        try {
            const user = await authUserService.execute({ email, password });
            return res.status(201).json(user); // Status 201 para sucesso
        }
        catch (error) {
            const statusCode = error.statusCode || 500; // Default para erro interno
            return res.status(statusCode).json({
                error: error.message || "Erro inesperado",
            });
        }
    }
}
exports.AuthUserController = AuthUserController;
