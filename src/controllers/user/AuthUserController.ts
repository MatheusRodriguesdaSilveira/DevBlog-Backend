import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const authUserService = new AuthUserService();

        try {
            const user = await authUserService.execute({ email, password });
            return res.status(201).json(user); // Status 201 para sucesso
        } catch (error: any) {
            const statusCode = error.statusCode || 500; // Default para erro interno
            return res.status(statusCode).json({
                error: error.message || "Erro inesperado",
            });
        }
        
    }
}

export { AuthUserController };
