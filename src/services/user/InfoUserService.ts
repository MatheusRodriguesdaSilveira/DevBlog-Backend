import { prismaClient } from "../../prisma"

class InfoUserService{
    async execute(user_id: string){

    const user = await prismaClient.user.findFirst({
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
                                }
                            },
                        },
                    },
                    likes: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            },
        }
    })

    return user
}
}

export { InfoUserService }