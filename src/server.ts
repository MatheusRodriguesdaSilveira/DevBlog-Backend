import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors'
import { router } from './routes';
import path from 'path';
import fileUpload from 'express-fileupload';


const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024}
}))
app.use(router);

app.use('/user_profiles',  express.static(path.resolve(__dirname, "..", "user_profiles")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    
    if (err instanceof Error) {
      return (res as any).status(400).json({ error: err.message });
    }
  } catch (error) {

    console.log(error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }



});

app.listen(process.env.PORT, () => console.log(`Server Online!!! Port: ${process.env.PORT}`));