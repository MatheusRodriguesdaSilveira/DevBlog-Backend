"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/user/CreateUserService");
class CreateUserController {
    async handle(req, res) {
        const { name, email, password } = req.body;
        const createUserService = new CreateUserService_1.CreateUserService();
        try {
            const user = await createUserService.execute({ name, email, password });
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
exports.CreateUserController = CreateUserController;
