"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
// Middleware de autenticação
function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    // Verifica se o token de autenticação foi fornecido
    if (!authToken) {
        return res.status(401).json({ error: "Token de autenticação não fornecido." });
    }
    // Extrai o token do cabeçalho Authorization
    const [, token] = authToken.split(" ");
    try {
        // Valida o token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // Armazena o ID do usuário no objeto da requisição
        req.user_id = sub;
        return next();
    }
    catch (err) {
        // Se ocorrer um erro na validação do token, retorna erro 401
        console.error("Erro ao verificar o token:", err); // Para debug
        return res.status(401).json({ error: "Token inválido ou expirado." });
    }
}
