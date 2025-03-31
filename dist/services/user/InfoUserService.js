"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoUserService = void 0;
const prisma_1 = require("../../prisma");
class InfoUserService {
    async execute(user_id) {
        const user = await prisma_1.prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
            select: {
                id: true,
                email: true,
                name: true,
                descriptionProfile: true,
                blogProfile: true,
                linkedinProfile: true,
                profilePicture: true,
                followers: {
                    select: {
                        followed: {
                            select: {
                                id: true,
                                name: true,
                                profilePicture: true,
                            },
                        },
                    },
                },
                following: {
                    select: {
                        follower: {
                            select: {
                                id: true,
                                name: true,
                                profilePicture: true,
                            },
                        },
                    },
                },
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
                        likes: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
        return user;
    }
}
exports.InfoUserService = InfoUserService;
