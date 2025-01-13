"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../prisma");
class CreateUserService {
    async execute({ name, email, password }) {
        if (!email) {
            throw new Error("Email incorreto");
        }
        const userAlreadyExists = await prisma_1.prismaClient.user.findFirst({
            where: { email },
        });
        if (userAlreadyExists) {
            throw new Error("Emai já existente");
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 8);
        const user = await prisma_1.prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        return user;
    }
}
exports.CreateUserService = CreateUserService;
