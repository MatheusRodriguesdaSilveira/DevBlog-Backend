"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdService = void 0;
const prisma_1 = require("../../prisma");
class GetUserByIdService {
    async execute(user_id) {
        const user = await prisma_1.prismaClient.user.findUnique({
            where: {
                id: user_id,
            },
            select: {
                name: true,
                id: true,
                descriptionProfile: true,
                blogProfile: true,
                linkedinProfile: true,
                profilePicture: true,
                followers: true,
                following: true,
                posts: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        imageUrl: true,
                        comments: {
                            select: {
                                content: true,
                                user: {
                                    select: {
                                        name: true,
                                        profilePicture: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return user;
    }
}
exports.GetUserByIdService = GetUserByIdService;
