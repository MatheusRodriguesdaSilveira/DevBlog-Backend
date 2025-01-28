import { prismaClient } from "../../prisma";

interface PostRequest{
    title: string;
    description: string;
    imageUrl: string
    userId: string
}

class CreatePostService {
    async execute({ title, description, imageUrl, userId }: PostRequest) {
        try {
            const userExists = await prismaClient.user.findUnique({
                where: { id: userId },
            });

            if (!userExists) {
                throw new Error("Usuário não encontrado");
            }

            const post = await prismaClient.post.create({
                data: {
                    title,
                    description,
                    imageUrl,
                    userId
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    imageUrl: true,
                },
            });

            return post;
        } catch (error) {
            throw new Error('Erro ao criar postagem');
        }
    }
}

export { CreatePostService };