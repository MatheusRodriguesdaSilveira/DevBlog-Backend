"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostController = void 0;
const CreatePostService_1 = require("../../services/post/CreatePostService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class CreatePostController {
    async handle(req, res) {
        const { title, description } = req.body;
        const userId = req.user_id;
        const createPostService = new CreatePostService_1.CreatePostService();
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error("error upload file image");
        }
        else {
            const file = req.files['file'];
            const resultFile = await new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader.upload_stream({}, function (error, result) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                }).end(file.data);
            });
            const post = await createPostService.execute({
                title,
                description,
                imageUrl: resultFile.url,
                userId,
            });
            return res.status(201).json(post);
        }
    }
}
exports.CreatePostController = CreatePostController;
