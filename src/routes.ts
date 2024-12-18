import express, { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { InfoUserController } from './controllers/user/InfoUserController';
import { UpdateUserController } from './controllers/user/EditeUserController';
import { CreatePostController } from './controllers/post/CreatePostController';
import { UserController } from './controllers/user/GetAllUsersController';
import { GetAllPostsController } from './controllers/post/GetAllPostController';

import { isAuthenticated } from './middlewares/isAuthticated';
import multer from 'multer';
import uploadConfig from './config/multer';
import { DeletePostController } from './controllers/post/DeletePostController';
import { EditPostController } from './controllers/post/EditPostController';

const router = Router();

const upload = multer(uploadConfig.upload("./user_profile"));

router.post('/users', new CreateUserController().handle as any);
router.post('/login', new AuthUserController().handle as any);

router.get('/info', isAuthenticated, new InfoUserController().handle as any);
router.get('/profiles', isAuthenticated, new UserController().handle as any);

router.put('/edit', isAuthenticated, new UpdateUserController().handle as any);

router.post('/post', isAuthenticated, new CreatePostController().handle as any);
router.get('/posts', isAuthenticated, new GetAllPostsController().handle as any);
router.delete('/post/:post_id', isAuthenticated, new DeletePostController().handle as any);
router.put('/edit/:post_id', isAuthenticated, new EditPostController().handle as any);

export { router };