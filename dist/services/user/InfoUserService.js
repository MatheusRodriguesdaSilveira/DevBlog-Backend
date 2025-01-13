"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoUserService = void 0;
const prisma_1 = require("../../prisma");
class InfoUserService {
    async execute(user_id) {
        const user = await prisma_1.prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                email: true,
                name: true,
                descriptionProfile: true,
                blogProfile: true,
                linkedinProfile: true,
                profilePicture: true,
                posts: true
            }
        });
        return user;
    }
}
exports.InfoUserService = InfoUserService;
