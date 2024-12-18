import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

// Tipagem da carga útil do JWT
interface PayLoad {
    sub: string;
}

// Middleware de autenticação
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    // Verifica se o token de autenticação foi fornecido
    if (!authToken) {
        return res.status(401).json({ error: "Token de autenticação não fornecido." });
    }

    // Extrai o token do cabeçalho Authorization
    const [, token] = authToken.split(" ");

    try {
        // Valida o token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET as string
        ) as PayLoad;

        // Armazena o ID do usuário no objeto da requisição
        req.user_id = sub;

        return next();
    } catch (err: unknown) {
        // Se ocorrer um erro na validação do token, retorna erro 401
        console.error("Erro ao verificar o token:", err); // Para debug
        return (res as any).status(401).json({ error: "Token inválido ou expirado." });
    }
}
