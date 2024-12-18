import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"
import { prismaClient } from "../../prisma";

interface AuthRequest{
    email: string
    password: string
}


class AuthUserService{
    async execute({email, password} : AuthRequest){

        // Verificar se o email já existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("Senha ou email não encontrado ou incorreto")
        }

        // Verificar se a senha já esta cadastrada
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Senha ou email não encontrado ou incorreto")
        }

        // Gerar um token JWT e devolver os dados do user com o ID NAME EMAIL se tudo estiver correto 
        const token = sign(
            {
                name: user.name,
                email: user.email
                
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )        

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            token: token
        }
        
    }

}

export { AuthUserService }