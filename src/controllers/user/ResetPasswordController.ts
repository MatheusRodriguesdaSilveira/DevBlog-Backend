import { Request, Response } from "express";
import { ResetPasswordService } from "../../services/user/ResetPasswordService";

class ResetPasswordController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { password, token } = req.body;

        const resetPassword = new ResetPasswordService();

        try {
            const user = await resetPassword.execute({ password, token });
            return res.status(204).json({
                user, 
                message: 'Email sent successfully',
            }); 
        } catch (error: any) {
            const statusCode = error.statusCode || 500; 
            return res.status(statusCode).json({
                error: error.message || "Erro inesperado",
            });
        }
    }
}

export { ResetPasswordController };
