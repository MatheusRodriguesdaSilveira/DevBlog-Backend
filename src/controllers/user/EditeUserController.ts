import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/EditUserService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      descriptionProfile,
      blogProfile,
      linkedinProfile,
    } = req.body;

    const file = req.files?.['file'] as UploadedFile;

    const updateUserService = new UpdateUserService();

    if (file) {
      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (error, result) => {
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
    } else {
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

export { UpdateUserController };