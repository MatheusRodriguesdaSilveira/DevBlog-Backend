"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordController = void 0;
const ResetPasswordService_1 = require("../../services/user/ResetPasswordService");
class ResetPasswordController {
    async handle(req, res) {
        const { password, token } = req.body;
        const resetPassword = new ResetPasswordService_1.ResetPasswordService();
        try {
            const user = await resetPassword.execute({ password, token });
            return res.status(204).json({
                user,
                message: 'Email sent successfully',
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
exports.ResetPasswordController = ResetPasswordController;
