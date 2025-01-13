"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPostsController = void 0;
const GetAllPostService_1 = require("../../services/post/GetAllPostService");
class GetAllPostsController {
    async handle(req, res) {
        try {
            const posts = await new GetAllPostService_1.GetAllPostsService().execute();
            if (!posts) {
                return res.status(404).json({ message: "Nenhum post encontrado" });
            }
            return res.json(posts);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar posts" });
        }
    }
}
exports.GetAllPostsController = GetAllPostsController;
