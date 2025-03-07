"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordService = void 0;
const date_fns_1 = require("date-fns");
const prisma_1 = require("../../prisma");
const bcryptjs_1 = require("bcryptjs");
class ResetPasswordService {
    async execute({ token, password }) {
        const userToken = await prisma_1.prismaClient.userToken.findFirst({
            where: {
                token
            }
        });
        if (!userToken) {
            throw new Error('User token does not exists');
        }
        const user = await prisma_1.prismaClient.user.findFirst({
            where: {
                id: userToken.userId
            }
        });
        if (!user) {
            throw new Error('User does not exists');
        }
        const tokenCreatedAt = userToken.createdAt;
        const compareDate = (0, date_fns_1.addHours)(tokenCreatedAt, 2);
        if ((0, date_fns_1.isAfter)(Date.now(), compareDate)) {
            throw new Error('Token expired');
        }
        user.password = await (0, bcryptjs_1.hash)(password, 8);
        const passwordUpdated = await prisma_1.prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                password: user.password
            }
        });
        await passwordUpdated;
    }
}
exports.ResetPasswordService = ResetPasswordService;
