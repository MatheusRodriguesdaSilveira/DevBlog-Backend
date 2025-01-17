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
                    comments: true,
                    id: true,
                    title: true,
                    description: true,
                    imageUrl: true,
                    createdAt: true,
                    updatedAt: true,
                }
            },
        }
    })

    return user
}
}

export { InfoUserService }