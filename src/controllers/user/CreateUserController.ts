import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const createUserService = new CreateUserService();

        try {
            const user = await createUserService.execute({ name, email, password });
            return res.status(201).json(user); // Status 201 para sucesso
        } catch (error: any) {
            const statusCode = error.statusCode || 500; // Default para erro interno
            return res.status(statusCode).json({
                error: error.message || "Erro inesperado",
            });
        }
    }
}

export { CreateUserController };
