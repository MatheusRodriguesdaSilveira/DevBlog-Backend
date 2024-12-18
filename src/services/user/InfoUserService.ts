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
            posts: true
        }
    })

    return user
}
}

export { InfoUserService }