import { Request, Response } from "express";
import { LikeServiceteste } from "../../services/like/testelike";

class LikeControllerTeste {
    async handle(req: Request, res: Response) {
        const teste = new LikeServiceteste();
        const result = await teste.execute();
        return res.json(result); // Agora, sem erros
    }
}
export { LikeControllerTeste };