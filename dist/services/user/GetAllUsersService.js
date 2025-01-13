"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersService = void 0;
const prisma_1 = require("../../prisma");
class GetAllUsersService {
    async execute() {
        const users = await prisma_1.prismaClient.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                descriptionProfile: true,
                blogProfile: true,
                linkedinProfile: true,
                profilePicture: true
            }
        });
        return users;
    }
}
exports.GetAllUsersService = GetAllUsersService;
