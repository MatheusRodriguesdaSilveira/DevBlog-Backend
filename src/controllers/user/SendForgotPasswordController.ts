import { Request, Response } from "express";
import { SendForgotPasswordService } from "../../services/user/SendForgotPasswordService";

class SendForgotPasswordController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const sendForgotPasswordEmail = new SendForgotPasswordService();

        try {
            const user = await sendForgotPasswordEmail.execute({ email });
            return res.status(201).json({
                user, 
            }); 
        } catch (error: any) {
            const statusCode = error.statusCode || 500; 
            return res.status(statusCode).json({
                error: error.message || "Erro inesperado",
            });
        }
    }
}

export { SendForgotPasswordController };
