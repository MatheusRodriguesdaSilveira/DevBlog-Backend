import { prismaClient } from "../../prisma";

interface PostRequest{
    title: string;
    description: string;
    post_id: string;
}

class EditPostService{
async execute({ title, description, post_id }: PostRequest){

    // Verificar se o post existe
    const postExists = await prismaClient.post.findUnique({
    where: { id: post_id },
     });
  
    if (!postExists) {
     throw new Error("Post not found.");
    }
  
    // Verifica se o título ou descrição foram alterados
    if (
      postExists.title === title &&
      postExists.description === description
    ) {
        return {
          message: "Nenhum campo foi alterado.",  
        };
    }

    const updatePost = await prismaClient.post.update({
        where: { id: post_id },
        data: {
            title,
            description,
        },
        select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
        }
    });

    return updatePost;
}
}

export { EditPostService }