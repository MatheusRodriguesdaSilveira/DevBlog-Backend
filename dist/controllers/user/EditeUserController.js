"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const EditUserService_1 = require("../../services/user/EditUserService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class UpdateUserController {
    async handle(req, res) {
        const { name, descriptionProfile, blogProfile, linkedinProfile, } = req.body;
        const file = req.files?.['file'];
        const updateUserService = new EditUserService_1.UpdateUserService();
        if (file) {
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader.upload_stream({}, (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                }).end(file.data);
            });
            const updatedUser = await updateUserService.execute({
                user_id: req.user_id,
                name,
                descriptionProfile,
                blogProfile,
                linkedinProfile,
                profilePicture: uploadResult.url,
            });
            return res.status(200).json(updatedUser);
        }
        else {
            const updatedUser = await updateUserService.execute({
                user_id: req.user_id,
                name,
                descriptionProfile,
                blogProfile,
                linkedinProfile,
            });
            return res.status(200).json(updatedUser);
        }
    }
}
exports.UpdateUserController = UpdateUserController;
