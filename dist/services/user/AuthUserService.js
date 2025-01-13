"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = require("../../prisma");
class AuthUserService {
    async execute({ email, password }) {
        // Verificar se o email já existe
        const user = await prisma_1.prismaClient.user.findFirst({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new Error("Senha ou email não encontrado ou incorreto");
        }
        // Verificar se a senha já esta cadastrada
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);
        if (!passwordMatch) {
            throw new Error("Senha ou email não encontrado ou incorreto");
        }
        // Gerar um token JWT e devolver os dados do user com o ID NAME EMAIL se tudo estiver correto 
        const token = (0, jsonwebtoken_1.sign)({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '30d'
        });
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            token: token
        };
    }
}
exports.AuthUserService = AuthUserService;
