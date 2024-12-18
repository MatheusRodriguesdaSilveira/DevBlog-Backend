import { Request, Response } from "express";
import { CreatePostService } from "../../services/post/CreatePostService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

class CreatePostController {
  async handle(req: Request, res: Response) {
      
      const { title, description } = req.body;

      const userId = req.user_id;

      const createPostService = new CreatePostService();
      
      
      if (!req.files || Object.keys(req.files).length === 0) {
        throw new Error("error upload file image")
      } else {
        const file = req.files['file'] as UploadedFile

        const resultFile: UploadApiResponse = await new Promise((resolve, reject ) => {
            cloudinary.uploader.upload_stream({}, function(error, result){
                if(error){
                    reject(error)
                    return
                }

                resolve(result)
            }).end(file.data)
        })
  
      const post = await createPostService.execute({
        title,
        description,
        imageUrl: resultFile.url,
        userId,
      });

      return res.status(201).json(post);
    }
  }
  // if (!req.files) {
  //   return res.status(400).json({ error: 'No file provided' });
  // }
        // const file : UploadedFile= req.files['file']
  
      // const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      //   cloudinary.uploader.upload_stream({}, (error, result) => {
      //     if (error) {
      //       reject(error);
      //       return;
      //     }
      //     resolve(result);
      //   }).end(file.data);
      // });
}

export { CreatePostController }