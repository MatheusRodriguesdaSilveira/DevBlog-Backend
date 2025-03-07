"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendForgotPasswordController = void 0;
const SendForgotPasswordService_1 = require("../../services/user/SendForgotPasswordService");
class SendForgotPasswordController {
    async handle(req, res) {
        const { email } = req.body;
        const sendForgotPasswordEmail = new SendForgotPasswordService_1.SendForgotPasswordService();
        try {
            const user = await sendForgotPasswordEmail.execute({ email });
            return res.status(201).json({
                user,
            });
        }
        catch (error) {
            const statusCode = error.statusCode || 500;
            return res.status(statusCode).json({
                error: error.message || "Erro inesperado",
            });
        }
    }
}
exports.SendForgotPasswordController = SendForgotPasswordController;
